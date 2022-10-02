import app from '../server'
import { authorDetails, books, reviews } from '../data/data'
import { feeds } from '../data/data'
const request = require('supertest')


jest.mock('axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn().mockImplementation(() => Promise.resolve({ data: books })),
        post: jest.fn().mockImplementation((url: any) => {
            if (url === 'http://localhost:3030/usersDetails') {
                return Promise.resolve({ data: authorDetails })
            }
            if (url === 'http://localhost:3030/reviewDetails') {
                return Promise.resolve({ data: reviews })
            }
        }),
    },
}))

describe('GET API', () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJBbnVkZWVwcyBOYWdhIiwibGFzdG5hbWUiOiJsYWthbmF2YXJhcHUiLCJtYWlsIjoiYW51ZGVlcHNzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiY29vbGNvb2xsIiwiaWQiOiJkYjgwZTA2ZS0wMTgwLTRjNTAtYjBmNi00ZGE3NjY0NjRmNzUiLCJpYXQiOjE2NTE3MzAyNzl9.xx7xYgcQweDjq9jE7qvJtt9tnV2olHBv_9XucLa2Coo";
    it('should return all feeds', async () => {
        const res = await request(app.callback()).get('/feeds').set('token', 'bearer ' + token)
        expect(res.status).toBe(200)
        expect(res.body).toEqual(feeds)
    })
    it('should return 403 Error not sending token', async () => {
        const res = await request(app.callback()).get('/feeds').set('token', "")
        expect(res.status).toBe(403)
    })
    it("should return books according to the limit and pageno", async () => {
        const res = await request(app.callback()).get('/feeds?page=1&limit=2').set('token', 'bearer ' + token)
        expect(res.status).toBe(200)
    })
})