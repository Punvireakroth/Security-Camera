const router = require("express").Router();

const { getbill } = require("../controller/appController.js");

// HTTP Request
// router.post("/user/signup", signup);
router.post("/product/getbill", getbill);

module.exports = router;
