// npx jest 6.testServer.test.js

const { expect } = require("chai");
const request = require("supertest");
const { add } = require("../server/handlers");
const { app } = require("../server/server");

describe("Testing handlers", () => {
    xit("handler for /add works", () => {
        // ...
    });
});

describe("Testing routers", () => {
    xit("route for /add", async () => {
        // ...
    });
});

