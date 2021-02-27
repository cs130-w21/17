import app from '../../app';
import {beforeEach} from "@jest/globals";
require('dotenv').config();
const mongoose = require("mongoose");
const supertest = require("supertest");

let access_token = null;
beforeEach(function(done) {
    supertest(app)
        .post('/api/auth/accessToken')
        .send({refreshToken: process.env.REFRESH_TOKEN})
        .expect(200)
        .end(function(err, res) {
            access_token = res.body.accessToken;
            done();
        });
});
describe('Post get calendar', () => {
    test("POST get calendar /api/auth/", async() => {
        await supertest(app)
            .post('/api/calendar/getcalendar')
            .send({token: access_token})
            .expect(200)
    });
    test("POST action /api/auth/", async() => {
        await supertest(app)
            .post('/api/calendar/action')
            .send({token: access_token})
            .expect(400)
    });
});