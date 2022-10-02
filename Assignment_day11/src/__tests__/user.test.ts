import app  from '../server'
import { books, users } from '../models/book.test.data'

const request = require('supertest');

describe('USERS Api/-', () => {
	let userId: string;
	let token: string;
	describe('user post and login', () => {
		it("signing Up should return 202 status", async () => {
			const res = await request(app.callback()).post('/signup')

				.set('Content-Type', 'application/json')
				.send(users[0])
			userId = res.body.id;
			expect(res.status).toBe(202)
		})
		// it("signing Up should return 202 status", async () => {
		// 	const res = await request(app.callback()).post('/signup')

		// 		.set('Content-Type', 'application/json')
		// 		.send(users[0])
		// 	userId = res.body.id;
		// 	expect(res.status).toBe(202)
		// })
		it("login should return 202 status ", async () => {
			const { firstname, mail, password } = users[0];
			const username = firstname;
			const res = await request(app.callback()).post('/login')
				.set('Content-Type', 'application/json')
				.send({ username, mail, password })
			token = res.text
			expect(res.status).toBe(202)
		})

	})
	describe('GET user', () => {
		it("get user by id", async () => {
			const res = await request(app.callback()).get(`/users/${userId}`)
				.set('token', 'bearer ' + token)
			expect(res.body.firstname).toBe(users[0].firstname)
			expect(res.body.lastname).toBe(users[0].lastname)
			expect(res.body.mail).toBe(users[0].mail)
			expect(res.body.password).toBe(users[0].password)
			expect(res.status).toBe(201)
		})
		it("should return Unauthorized", async () => {
			const res = await request(app.callback()).get(`/users/${userId}`)
				.set('token', "")
			expect(res.status).toBe(403)
		})
	})
	describe('Update Endpoint', () => {
		const updateUser = {
			firstname: "Dhoni",
			lastname: "MS",
			mail: "msdhoni@getMaxListeners.com",
			password: "cool"

		}
		it("should return updated user status", async () => {
			const res = await request(app.callback()).put(`/users/${userId}`)
				.set('token', 'bearer ' + token)
				.send(updateUser)

			expect(res.status).toBe(201)
		})
		it("get user by id and verify updated details", async () => {
			const res = await request(app.callback()).get(`/users/${userId}`)
				.set('token', 'bearer ' + token)
			expect(res.body.firstname).toBe(updateUser.firstname)
			expect(res.body.lastname).toBe(updateUser.lastname)
			expect(res.body.mail).toBe(updateUser.mail)
			expect(res.body.password).toBe(updateUser.password)
			expect(res.status).toBe(201)
		})
		it("should return Unauthorized", async () => {
			const res = await request(app.callback()).get(`/users/${userId}`)
				.set('token', "")
			expect(res.status).toBe(403)
		})

	})
	describe('DELETE Endpoint/-', () => {
		it("should return deleted id", async () => {
			const res = await request(app.callback()).delete(`/users/${userId}`)
				.set('token', 'bearer ' + token)
			expect(res.status).toBe(201)
		})
		it('should return not found error 404', async () => {
			const res = await request(app.callback()).get(`/users/${userId}`)
				.set('token', 'bearer ' + token);
			expect(res.status).toBe(404)
		})
		it("should return Unauthorized", async () => {
			const res = await request(app.callback()).delete(`/users/${userId}`)
				.set('token', "")
			expect(res.status).toBe(403)
		})
	})
})

