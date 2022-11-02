const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const mid = require("../helper/middleware");

router.post("/", mid.mustLogin, controller.user_bio.create);
router.delete("/", mid.mustLogin, controller.user_bio.delete);
router.put("/update", mid.mustLogin, controller.user_bio.update);
router.get("/index", controller.user_bio.index);
router.get("/:id", controller.user_bio.show);

module.exports = router;
