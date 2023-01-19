const router = require("express").Router();

const { getbill, logTime } = require("../controller/appController.js");

// HTTP Request
// router.post("/user/signup", signup);
router.post("/product/getbill", getbill);
router.post("/product/logtime", logTime);

module.exports = router;
