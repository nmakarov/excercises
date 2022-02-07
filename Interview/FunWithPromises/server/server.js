const express = require("express");
const http = require("http");
const routes = require("./routes");

const app = new express();
app.use("/test", (req, res) => res.json({ok:true}));
app.use("/", routes);
const server = http.createServer(app);

module.exports = { app, server };
