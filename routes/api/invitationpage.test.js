import app from '../../app';
require('dotenv').config();
const supertest = require("supertest");

/**
 * @name Invitation page tests
 * @route /api/invitationpage
 * @desc Unit tests for routes in /api/invitationpage
 */
describe('Post invitation page', () => {
    let user_data = {
        id: 'impossible_id'
    }
    /**
     * @name Post invalid invitation page access token
     * @route {POST} /api/invitationpage/accessToken
     * @routeparam {request} Send in an invitation's id in an effort to gain an access token from it
     *      This test is expected to fail given a fake id
     */
    test("POST INVALID INVITATION PAGE ACCESS TOKEN", async() => {
        await supertest(app)
            .post('/api/invitationpage/accessToken')
            .send(user_data)
            .expect(400)
    });
});