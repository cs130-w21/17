import app from '../../app';
require('dotenv').config();
const supertest = require("supertest");

let user_data = {
    token: null,
    refreshToken: process.env.REFRESH_TOKEN
}
let event = {
    id: 'asdf',
    location: 'asdf',
    summary: 'asdf',
    description: 'asdf',
    start: {
        dateTime: 'asdf'
    },
    end: {
        dateTime: 'asdf'
    }
}
beforeAll(async() => {
    await supertest(app)
        .post('/api/auth/accessToken')
        .send(user_data)
        .then((res) => {
            user_data.token = res.body.accessToken;
        });
});
describe('Calendar functionality', () => {
    test("POST get calendar", async () => {
        await supertest(app)
            .post("/api/calendar/getcalendar")
            .send(user_data)
            .expect(200)
    });
    test("POST add event", async () => {
        await supertest(app)
            .post("/api/calendar/addEvent")
            .send(user_data, event)
            .expect(200)
    });
    test("POST edit event", async () => {
        await supertest(app)
            .post("/api/calendar/editEvent")
            .send(user_data)
            .send(event)
            .expect(200)
    });
    test("POST remove event", async () => {
        await supertest(app)
            .post("/api/calendar/removeEvent")
            .send(user_data)
            .send(event)
            .expect(200)
    });
});