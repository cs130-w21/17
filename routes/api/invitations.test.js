import app from '../../app';
require('dotenv').config();
const mongoose = require("mongoose");
const supertest = require("supertest");

describe('Get invitations', () => {
    let user_data = {
        invitee_name: 'Test Subject',
        invitee_email: process.env.TEST_EMAIL,
        inviter_name: 'EasyMeet',
        inviter_email: process.env.EM_EMAIL
    }
    test("GET /api/invitations", async () => {
        await supertest(app)
            .get("/api/invitations/")
            .expect(200)
    });
    test("POST /api/invitations", async() => {
        await supertest(app)
            .post('/api/invitations/add')
            .send(user_data)
            .expect(200)
    });
});