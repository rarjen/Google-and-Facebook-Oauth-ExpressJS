const express = require("express");
const router = express.Router();
const controller = require("../controllers");

router.post("/", controller.auth.create);
router.post("/login", controller.auth.login);

module.exports = router;
