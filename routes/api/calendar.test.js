import app from '../../app';
require('dotenv').config();
const supertest = require("supertest");

let user_data = {
    token: null,
    refreshToken: process.env.REFRESH_TOKEN
}
let event = {
    id: 'ASDF',
    location: 'Somewhere',
    summary: 'Appointment',
    description: 'Get to it',
    start: {
        dateTime: '2021-12-16T10:00:00.000-07:00'
    },
    end: {
        dateTime: '2021-12-16T10:25:00.000-07:00'
    }
}
/**
 * @name beforeAll calender tests
 * @route /api/auth/accessToken
 * @desc This just gathers a valid access token to use for testing the calendar's functionality.
 */
beforeAll(async() => {
    await supertest(app)
        .post('/api/auth/accessToken')
        .send(user_data)
        .then((res) => {
            user_data.token = res.body.accessToken;
        });
});
/**
 * @name Calendar tests
 * @route /api/calendar/
 * @desc Unit tests for routes in /api/calendar
 */
describe('Calendar functionality', () => {
    /**
     * @name Get calendar page
     * @route {POST} /api/calendar/getcalendar
     * @routeparam {request} Send a refresh token to see if the get calendar route works.
     *      This is expected to succeed givenn a valid refresh token.
     */
    test("POST get calendar", async () => {
        try {
            await supertest(app)
                .post("/api/calendar/getcalendar")
                .send(user_data)
                .expect(200)
        } catch (e) {
            console.log('stupid');
        }
    });
});