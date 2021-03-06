import app from '../../app';
require('dotenv').config();
const supertest = require("supertest");

/**
 * @name Auth Functionality
 * @route /api/auth
 * @desc Unit tests for routes in /api/auth
 */
describe('Auth functionality', () => {
    let user_data = {
        code: 'bogus-code',
        refreshToken: process.env.REFRESH_TOKEN
    }
    /**
     * @name Invalid Register
     * @route {POST} /api/auth/register
     * @routeparam {request} Sends in user data with the field 'code' and tries to register
     *    the new user to the database. Invalid codes should throw a 400 code.
     */
    test("POST INVALID AUTH REGISTER", async () => {
        await supertest(app)
            .post("/api/auth/register")
            .send(user_data)
            .expect(400)
    })
    /**
     * @name Access Token
     * @route {POST} /api/auth/accessToken
     * @routeparam {request} Sends in the refresh token from the EasyMeet Gmail. We expect
     *     this route to succeed, given a valid refresh token.
     */
    test("POST AUTH ACCESS TOKEN", async () => {
        await supertest(app)
            .post("/api/auth/accessToken")
            .send(user_data)
            .expect(200)
    });
});