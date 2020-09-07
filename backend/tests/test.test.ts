export{};
const chai = require("chai");
//const sinon = require("sinon");
const expect = chai.expect;
const authToken = "YOUR_AUTH_TOKEN"
const eventData = {
    name: "Get all todos",
    request: {
        method: "GET",
        header: [
            {
                key: "Authorization",
                value: `Bearer ${authToken}`,
                type: "text"
            }
        ],
        body: {
            mode: "raw",
            raw: ""
        },
        url: {
            raw: "YOUR_API_ENDPOINT",
            protocol: "https",
            host: [
                "YOUR_API_ID",
                "execute-api",
                "us-east-2",
                "amazonaws",
                "com"
            ],
            path: [
                "dev",
                "todos"
            ]
        }
    },
    response: []
};

const getTodosHandler = require("../lambda/http/getTodos.ts");

describe("UserRepository", function () {
    describe("create", function () {
        it("should add a new user to the db", async function (done) {
            // getTodosHandler.should.eventually.be(true);
            getTodosHandler.handler(eventData)
                .then(data => {
                    done();
                })
                .catch(error => console.log(error));

            expect(true).to.equal(true);
        });
    });
});