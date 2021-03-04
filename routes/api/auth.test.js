import app from '../../app';
require('dotenv').config();
const supertest = require("supertest");

describe('Invalid register', () => {
    let user_data = {
        code: 'bogus-code',
        refreshToken: process.env.REFRESH_TOKEN
    }
    test("POST REGISTER /api/auth", async () => {
        await supertest(app)
            .post("/api/auth/register")
            .send(user_data)
            .expect(400)
    })
    test("POST ACCESS TOKEN /api/auth", async () => {
        await supertest(app)
            .post("/api/auth/accessToken")
            .send(user_data)
            .expect(200)
    });
});