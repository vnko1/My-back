const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// const { authRouter, notices } = require("./routes");

const { Email } = require("./services");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ mess: "OK" });
});

// app.use("/auth", authRouter);
// app.use("/notices", notices);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
