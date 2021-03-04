import app from '../../app';
require('dotenv').config();
const supertest = require("supertest");

describe('Get invitations', () => {
    let user_data = {
        invitee_name: 'Test Subject',
        invitee_email: process.env.TEST_EMAIL,
        inviter_name: 'EasyMeet',
        inviter_email: process.env.EM_EMAIL,
        id: 'impossible_id'
    }
    test("GET /api/invitations", async () => {
        await supertest(app)
            .get("/api/invitations/")
            .expect(200)
    });
    test("POST ADD /api/invitations", async() => {
        await supertest(app)
            .post('/api/invitations/add')
            .send(user_data)
            .expect(200)
    });
    //Don't think I can test valid deletions at this time
    test("POST INVALID DELETE /api/invitations", async() => {
        await supertest(app)
            .post('/api/invitations/delete')
            .send(user_data)
            .expect(400)
    });
});