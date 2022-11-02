const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
// const user_history = require("../controllers/user_history");
// const user_bio = require("../controllers/user_bio");
const c = require("../controllers");
// const mid = require("../helpers/middleware");

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/auth/login", c.auth.google);
router.get("/auth/login/facebook", c.auth.facebook);
router.get("/auth/register", c.auth.registerPage); // menampilkan halaman registrasi
router.post("/auth/register", c.auth.register);

router.get("/auth/login/basic", c.auth.loginPage); // menampilkan halaman login
router.post("/auth/login/basic", c.auth.login);

// Auth
// router.post("/auth", auth.create);
// router.post("/auth/login", auth.login);

// // User Bio
// router.post("/add", mid.mustLogin, user_bio.create);
// router.get("/index", user_bio.index);
// router.get("/:id", user_bio.show);
// router.put("/update", mid.mustLogin, user_bio.update);
// router.delete("/:id", mid.mustLogin, user_bio.delete);

// // // User History
// router.post("/history", mid.mustLogin, user_history.create);
// router.get("/history/index", user_history.index);
// router.get("/history/:id", user_history.show);

module.exports = router;
