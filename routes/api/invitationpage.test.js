import app from '../../app';
require('dotenv').config();
const supertest = require("supertest");

describe('Post invitation page', () => {
    let user_data = {
        id: 'impossible_token'
    }
    test("POST invalid /api/invitationpage/", async() => {
        await supertest(app)
            .post('/api/invitationpage/accessToken')
            .send(user_data)
            .expect(400)
    });
    let new_data = {
        id: process.env.TEST_ID
    }
    test("POST valid /api/invitationpage/", async() => {
        await supertest(app)
            .post('/api/invitationpage/accessToken')
            .send(new_data)
            .expect(200)
    });
});