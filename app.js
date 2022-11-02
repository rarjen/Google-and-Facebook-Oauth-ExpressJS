const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();
const { HTTP_PORT } = process.env;

app.use(express.json()); // untuk membaca body tipe json

app.use(morgan("dev")); // untuk logging
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/api", router);

// 404 handler
app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "Are you lost?",
  });
});

// 500 handler
app.use((err, req, res, next) => {
  return res.status(500).json({
    status: false,
    message: err.message,
  });
});

app.listen(HTTP_PORT, () => {
  console.log(`Listening to ${HTTP_PORT}`);
});
