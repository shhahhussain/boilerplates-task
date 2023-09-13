const express = require("express");
const expressLogger = require("express-bunyan-logger");
const cors = require("cors");
const router = require("./routes");

process.on("uncaughtException", (e) => {
  console.log(e);
});

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  expressLogger({
    excludes: [
      "headers",
      "req",
      "user-agent",
      "short-body",
      "http-version",
      "req-headers",
      "res-headers",
      "body",
      "res",
    ],
  })
);
app.use(cors());
app.use(function (req, res, next) {
  res.success = async (data) => {
    return res.status(200).send({ success: true, error: null, body: data });
  };

  res.internalError = async (error) => {
    return res.status(error.status || 500).send({
      success: false,
      error: error.message || "Internal Server Error",
      body: null,
    });
  };

  next();
});

app.use("/api", router);

app.use((req, res) => {
  return res.status(404).send("Error 404, Route not found");
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  req.log.error(err);
  return res.status(500).send(err.message);
});

module.exports = app;
