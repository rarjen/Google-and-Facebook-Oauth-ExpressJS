const express = require("express");
const router = express.Router();
const c = require("../controllers");
const authorize = require("../middlewares/authorize");
const restrict = require("../middlewares/restrict");
// const Roles = require("../utils/roles");
const multer = require("multer");
const upload = multer();

router.get("/", (req, res) => {
  res.render("home");
});

// Auth
router.get("/auth/login", c.auth.google);
router.get("/auth/login/facebook", c.auth.facebook);
router.get("/auth/register", c.auth.registerPage); // menampilkan halaman registrasi
router.post("/auth/register", c.auth.register);

router.get("/auth/login/basic", c.auth.loginPage); // menampilkan halaman login
router.post("/auth/login/basic", c.auth.login);

router.get("/createBio", authorize.authorize, restrict, c.userBio.createPage);
router.post(
  "/createBio",
  authorize.authorize,
  restrict,
  upload.single("image"),
  c.userBio.create
);
router.put(
  "/createBio",
  authorize.authorize,
  restrict,
  upload.single("image"),
  c.userBio.update
);

// User History
router.post(
  "/createScore",
  authorize.authorize,
  restrict,
  c.userHistory.createScore
);

router.get(
  "/createScore/:id",
  authorize.authorize,
  restrict,
  c.userHistory.getScore
);

router.get(
  "/createScore/",
  authorize.authorize,
  restrict,
  c.userHistory.getAllScore
);

router.put(
  "/createScore/",
  authorize.authorize,
  restrict,
  c.userHistory.updateScore
);

router.delete(
  "/deleteScore/:id",
  authorize.authorize,
  restrict,
  c.userHistory.deleteScore
);

module.exports = router;
