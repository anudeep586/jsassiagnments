import app  from '../server'
import { books, users } from '../models/book.test.data'

const request = require('supertest');

describe('BOOKS Api ', () => {
	let createUsers: any = []
	let logintokens: any = []
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
		logintokens = await Promise.all(
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
					.set('token', 'bearer ' + logintokens[0])
					.send(book)
				return response.body
			}),
		)
	})

	describe('Get api', () => {
		it('should return all books', async () => {
			const { statusCode, body } = await request(app.callback()).get(`/book/page/1/7`).set('token', 'bearer ' + logintokens[0])

			expect(statusCode).toBe(200)
		})
		let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJBbnVkZWVwcyBOYWdhIiwibGFzdG5hbWUiOiJsYWthbmF2YXJhcHUiLCJtYWlsIjoiYW51ZGVlcHNzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiY29vbGNvb2xsIiwiaWQiOiJkYjgwZTA2ZS0wMTgwLTRjNTAtYjBmNi00ZGE3NjY0NjRmNzUiLCJpYXQiOjE2NTE3MzAyNzl9.xx7xYgcQweDjq9jE7qvJtt9tnV2olHBv_9XucLa2Coo";
		it('should return 404 error for sending wrong userID through token', async () => {
			const { statusCode, body } = await request(app.callback()).get(`/book/page/1/7`).set('token', 'bearer ' + token)

			expect(statusCode).toBe(404)
		})
		it('should return all books', async () => {
			const { statusCode, body } = await request(app.callback()).get(`/book/`).set('Content-Type', 'application/json')
			.set('token', 'bearer ' + logintokens[0])
			console.log(body,"hello")

			expect(statusCode).toBe(200)
		})
		it('should return book matching bookid', async () => {
			const bookId = createBooks[0].id

			const response = await request(app.callback())
				.get(`/book/${bookId}`)
				.set('Content-Type', 'application/json')
				.set('token', 'bearer ' + logintokens[0])
			expect(response.statusCode).toBe(200)
			expect(response.body.id).toBe(bookId)
			expect(response.body).toEqual(createBooks[0])
		})
		it('should return query matching books', async () => {
			const { statusCode, body } = await request(app.callback()).get(
				`/book?query=Anudeep`).set('Content-Type', 'application/json')
				.set('token', 'bearer ' + logintokens[0])
			expect(statusCode).toBe(200)
		})
		it('should return 400 for sending wrong userid', async () => {
			const res = await request(app.callback()).get(
				`/book?query="Anudeep"`).set('Content-Type', 'application/json')
				.set('token', 'bearer ' +token)
			expect(res.statusCode).toBe(404)
		})
		it('should return empty token with status code 403', async () => {
			const bookId = '123'
			const { statusCode, body } = await request(app.callback()).get(`/book/${bookId}`)

			expect(statusCode).toBe(403)
		})
		it("should return 404 for sending wrong userId ",async()=>{
			const {statusCode}=await request(app.callback()).get('/book/').set('token','bearer '+token)
			expect(statusCode).toBe(404)
		})
	})
	let bookId: any
	describe('POST Api', () => {
		it('should return created book', async () => {
			const response = await request(app.callback())
				.post('/book')
				.set('token', 'Bearer ' + logintokens[0])
				.send(books[0])
			bookId = response.body.id
			expect(response.statusCode).toBe(201)
		})
		let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJBbnVkZWVwcyBOYWdhIiwibGFzdG5hbWUiOiJsYWthbmF2YXJhcHUiLCJtYWlsIjoiYW51ZGVlcHNzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiY29vbGNvb2xsIiwiaWQiOiJkYjgwZTA2ZS0wMTgwLTRjNTAtYjBmNi00ZGE3NjY0NjRmNzUiLCJpYXQiOjE2NTE3MzAyNzl9.xx7xYgcQweDjq9jE7qvJtt9tnV2olHBv_9XucLa2Coo";
		it('should return status code 400 for sending wrong userId', async () => {
			const response = await request(app.callback())
				.post('/book')
				.set('token', 'Bearer ' + token)
				.send(books[0])
			expect(response.statusCode).toBe(400)
		})
		it('should should matching bookId', async () => {
			const res= await request(app.callback()).get(`/book/${bookId}`)
				.set('Content-Type', 'application/json')
				.set('token', 'bearer ' + logintokens[0])
			expect(res.status).toBe(200)
			expect(res.body.id).toBe(bookId)
		})
		it('should return unauthorized', async () => {
			const response = await request(app.callback())
				.post('/book')
				.set('token', '')
				.send(createBooks[0].title)
			expect(response.statusCode).toBe(403)
		})

		it('should return validationError 400', async () => {
			const data = {
				bookName: '',
			}
			const { statusCode, body } = await request(app.callback())
				.post('/book')
				.set('token', 'Bearer ' + logintokens[0])
				.send(data)

			expect(statusCode).toBe(400)
		})
	})

	describe('delete book', () => {
		
		it('should return error 404 sending wrong userID through token', async () => {
		let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJBbnVkZWVwcyBOYWdhIiwibGFzdG5hbWUiOiJsYWthbmF2YXJhcHUiLCJtYWlsIjoiYW51ZGVlcHNzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiY29vbGNvb2xsIiwiaWQiOiJkYjgwZTA2ZS0wMTgwLTRjNTAtYjBmNi00ZGE3NjY0NjRmNzUiLCJpYXQiOjE2NTE3MzAyNzl9.xx7xYgcQweDjq9jE7qvJtt9tnV2olHBv_9XucLa2Coo";

			const { status, body } = await request(app.callback())
				.delete(`/book/${bookId}`)
				.set('token', 'Bearer ' + token)
			expect(status).toBe(404)
		})
		it('should delete the matching bookId', async () => {
			const { status, body } = await request(app.callback())
				.delete(`/book/${bookId}`)

				.set('token', 'Bearer ' + logintokens[0])
			expect(status).toBe(202)
		})
		it('fetching the deleted bookId should return Not found', async () => {
			const res = await request(app.callback())
				.get(`/book/${bookId}`)
				.set('token', 'Bearer ' + logintokens[0])
			expect(res.status).toBe(404)
		})
		it('should return unauthorized', async () => {
			const response = await request(app.callback())
				.post('/book')
				.set('token', '')
				.send(createBooks[0].title)
			expect(response.statusCode).toBe(403)
		})
	})

	describe('updating book', () => {
		let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJBbnVkZWVwcyBOYWdhIiwibGFzdG5hbWUiOiJsYWthbmF2YXJhcHUiLCJtYWlsIjoiYW51ZGVlcHNzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiY29vbGNvb2xsIiwiaWQiOiJkYjgwZTA2ZS0wMTgwLTRjNTAtYjBmNi00ZGE3NjY0NjRmNzUiLCJpYXQiOjE2NTE3MzAyNzl9.xx7xYgcQweDjq9jE7qvJtt9tnV2olHBv_9XucLa2Coo";
		it('should return 404 unAuthorized sending wrong userID through token', async () => {
			const bookId = createBooks[0].id
			const data = {
				bookName: "Charlie the chocolate factory",
				authorName: "warner bro's",
				description: "nice book",
				pages: 80
			}
			const response = await request(app.callback())
				.put(`/book/${bookId}`)
				.set('Content-Type', 'application/json')
				.set('token', 'Bearer ' + token)
				.send(data)
			expect(response.statusCode).toBe(404)
		})
		it('should update matching bookId', async () => {
			const bookId = createBooks[0].id
			const data = {
				bookName: "Charlie the chocolate factory",
				authorName: "warner bro's",
				description: "nice book",
				pages: 80
			}
			const response = await request(app.callback())
				.put(`/book/${bookId}`)
				.set('Content-Type', 'application/json')
				.set('token', 'Bearer ' + logintokens[0])
				.send(data)
			expect(response.statusCode).toBe(202)
			expect(response.body.id).toBe(bookId)
		})
		it('should return unauthorized', async () => {
			const response = await request(app.callback())
				.post('/book')
				.set('token', '')
				.send(createBooks[0].title)
			expect(response.statusCode).toBe(403)
		})
	})
})

