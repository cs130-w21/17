import app from '../../app';
require('dotenv').config();
const mongoose = require("mongoose");
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
        //random ID found within database,
        //probably don't do this
        id: process.env.TEST_ID
    }
    test("POST valid /api/invitationpage/", async() => {
        await supertest(app)
            .post('/api/invitationpage/accessToken')
            .send(new_data)
            .expect(200)
    });
});