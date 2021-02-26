import app from '../../app';
app.listen(process.env.PORT, () => {
    console.log("Server has started!");
});

require('dotenv').config();
const mongoose = require("mongoose");
const supertest = require("supertest");
test("GET /routes/api/invitations", async () => {
    await supertest(app).get("/routes/api/invitations")
        .expect(404)
});
/*
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.should()
chai.use(chaiHttp);

describe('Task API\'s', () => {
    describe("GET /routes/api/invitations", () => {
        chai.request(app)
            .get("/routes/api/invitations")
            .end((err, response) => {
                expect(response).to.have.status(200);
                done();
            });
    });
});
*/