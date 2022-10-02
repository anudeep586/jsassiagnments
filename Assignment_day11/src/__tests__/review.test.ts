import  app  from '../server'
import { books, users } from '../models/book.test.data'

const request = require('supertest');

describe('REVIEWS api/', () => {
	let createUsers: any = []
	let loggedInUsers: any = []
	let createBooks: any = []
	beforeAll(async () => {
		createUsers = await Promise.all(
			users.map(async (user: any) => {
				const response = await request(app.callback())
					.post('/signup')
					.set('Content-Type', 'application/json')
					.send(user)
				return response.body
			}),
		)
		loggedInUsers = await Promise.all(
			users.map(async (user: any) => {
				const { mail, password } = user
				const username = user.firstname
				const response = await request(app.callback())
					.post('/login')
					.set('Content-Type', 'application/json')
					.send({ username, mail, password })
				return response.text
			}),
		)
	})

	beforeAll(async () => {
		createBooks = await Promise.all(
			books.map(async (book: any) => {
				const response = await request(app.callback())
					.post('/book')
					.set('Content-Type', 'application/json')
					.set('token', 'bearer ' + loggedInUsers[0])
					.send(book)
				return response.body
			}),
		)
	})
	let reviewId: string;
	describe('POST reviews', () => {
		const review = {
			description: "nice book",
		}
		it('should return review  body along with userid and book id ', async () => {
			const res = await request(app.callback()).post(`/review/${createBooks[0].id}`)
				.set('token', 'Bearer ' + loggedInUsers[0])
				.send(review)
			reviewId = res.body.reviewId
			expect(res.statusCode).toBe(202)
		})
		it('should return unauthorized', async () => {
			const response = await request(app.callback())
				.post(`/review/${createBooks[0].id}`)
				.set('token', '')
				.send(createBooks[0].title)
			expect(response.statusCode).toBe(403)
		})
	})
	describe('GET review', () => {
		it('should return review according to Id of book and review', async () => {
			const response = await request(app.callback())
				.get(`/review/${createBooks[0].id}/${reviewId}`)
				.set('Content-Type', 'application/json')
				.set('token', 'bearer ' + loggedInUsers[0])
			expect(response.statusCode).toBe(202)
			expect(response.body.reviewId).toBe(reviewId)
			expect(response.body.bookId).toBe(createBooks[0].id)
		})
		it('should return unauthorized', async () => {
			const response = await request(app.callback())
				.get(`/review/${createBooks[0].id}/${reviewId}`)
				.set('token', '')
				.send(createBooks[0].title)
			expect(response.statusCode).toBe(403)
		})
	})
	const updateBook = {
		description: "cool book"
	}
	describe('UPDATE review', () => {
		it('should return updated review body', async () => {
			const res = await request(app.callback()).put(`/review/${createBooks[0].id}/${reviewId}`)
				.set('token', 'bearer ' + loggedInUsers[0])
				.send(updateBook)
			expect(res.statusCode).toBe(202)
		})
		it('should return updated message', async () => {
			const res = await request(app.callback())
				.get(`/review/${createBooks[0].id}/${reviewId}`)
				.set('Content-Type', 'application/json')
				.set('token', 'bearer ' + loggedInUsers[0])
			expect(res.body.description).toBe(updateBook.description)
		})
		it('should return unAuthorized', async () => {
			const res = await request(app.callback()).put(`/review/${createBooks[0].id}/${reviewId}`)
				.set('token', "")
				.send(updateBook)
			expect(res.statusCode).toBe(403)
		})
	})
	describe('DELETE review', () => {
		it('should returndelete review', async () => {
			const res = await request(app.callback()).delete(`/review/${createBooks[0].id}/${reviewId}`)
				.set('token', 'bearer ' + loggedInUsers[0]);
			expect(res.status).toBe(202)
		})
		it('should return not found error 404', async () => {
			const res = await request(app.callback()).get(`/review/${createBooks[0].id}/${reviewId}`)
				.set('token', 'bearer ' + loggedInUsers[0]);
			expect(res.status).toBe(404)
		})
		it('should return unAuthorized', async () => {
			const res = await request(app.callback()).delete(`/review/${createBooks[0].id}/${reviewId}`)
				.set('token', "")
			expect(res.statusCode).toBe(403)
		})
	})
})
