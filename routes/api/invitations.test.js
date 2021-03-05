import app from '../../app';
require('dotenv').config();
const supertest = require("supertest");

/**
 * @name Invitation tests
 * @route /api/invitations
 * @desc Unit tests for routes in /api/invitations
 */
describe('Get invitations', () => {
    let user_data = {
        invitee_name: 'Test Subject',
        invitee_email: process.env.TEST_EMAIL,
        inviter_name: 'EasyMeet',
        inviter_email: process.env.EM_EMAIL,
        id: 'impossible_id'
    }
    /**
     * @name Delete invalid invitation
     * @route {POST} /api/invitations/delete
     * @routeparam {request} We send in user data with the required fields id to try
     *      and delete an invitation. We expect this to not succeed with an invalid id.
     *      This is good since we don't want random deletions for any type of id.
     */
    test("POST INVALID DELETE INVITATION", async() => {
        await supertest(app)
            .post('/api/invitations/delete')
            .send(user_data)
            .expect(400)
    });
});