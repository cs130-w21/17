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
        await supertest(app)
            .post("/api/calendar/getcalendar")
            .send(user_data)
            .expect(200)
    });
    /**
     * @name Post add event
     * @route {POST} /api/calendar/addEvent
     * @routeparam {request} Given a valid token as well as an event object to be added, we can expect
     *      this test to succeed and add the event to the calendar
     */
    test("POST add event", async () => {
        await supertest(app)
            .post("/api/calendar/addEvent")
            .send(user_data, event)
            .expect(200)
    });
    /**
     * @name Post edit event
     * @route {POST} /api/calendar/editEvent
     * @routeparam {request} Given a valid token as well as an event object's id and fields to be edited,
     *      this route should change the given the event with the corresponding id with the new parameters.
     *      This test should succeed given a valid token along with a mocked event object found in
     *      /client/src/types/interfaces.
     */
    test("POST edit event", async () => {
        await supertest(app)
            .post("/api/calendar/editEvent")
            .send(user_data)
            .send(event)
            .expect(200)
    });
    /**
     * @name Post remove event
     * @route {POST} /api/calendar/removeEvent
     * @routeparam {request} Given a valid token as well as an event object's id, this route removes
     *      the event from the calendar. This test should succeed as we have added the event in the
     *      previous test and kept the event object with all its parameters intact.
     */
    test("POST remove event", async () => {
        await supertest(app)
            .post("/api/calendar/removeEvent")
            .send(user_data)
            .send(event)
            .expect(200)
    });
});