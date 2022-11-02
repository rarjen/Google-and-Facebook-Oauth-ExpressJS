const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const mid = require("../helper/middleware");

router.post("/", mid.mustLogin, controller.user_history.create);
router.get("/index", controller.user_history.index);
router.get("/:id", controller.user_history.show);

module.exports = router;
