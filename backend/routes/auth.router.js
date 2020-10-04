const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const router = express.Router();
const auth= require("../controllers/auth.controller");

router.post('/', auth.signin)

module.exports = router;
