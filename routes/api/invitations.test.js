import app from '../../app';
require('dotenv').config();
const mongoose = require("mongoose");
const supertest = require("supertest");

describe('Get invitations', () => {
    let user_data = {
        invitee_name: 'Matthew the Great',
        invitee_email: 'qqinglin0327@gmail.com',
        inviter_name: 'EasyMeet',
        inviter_email: 'easy.meet.21@gmail.com'
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