const express = require("express");
const http = require("http");
const { createError, niceResponse, niceErrors } = require("./middleware/niceErrors");

// const { authMiddleware, failMiddleware, rateLimiter } = require("./middleware");
const apiRoutes = require("./routes/apiRoutes");
// const { authRoutes } = require("./routes/authRoutes");

const { delay } = require("./middleware/delay");
const { fail } = require("./middleware/fail");

const app = express();

app.use(niceResponse);

app.get("/version", (req, res) => {
    console.info(">> here!!!");
    res.niceResponse({ version: 1 });
});

app.use("/api", delay, fail, apiRoutes);
// app.use("/api", authMiddleware, failMiddleware, rateLimiter, apiRoutes);
// app.use("/auth", authRoutes);
app.use("*", (req, res, next) => {
    return next(createError(404));
});

app.use(niceErrors);

// app.use((error, req, res, next) => {
//     console.info(">> error handler:", error);
//     console.info(">> typeOf 404?", error instanceof createError.NotFound);
//     console.info(">> typeOf 400?", error instanceof createError.BadRequest);
//     console.info(">> error keys:", Object.keys(error), error.message);
//     next(error);
// });

module.exports = http.createServer(app);

