const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const auht_js = require("../middlewares/auht_jwt");
const authJwt = require("../middlewares/auht_jwt");
const verify_signup = require("../middlewares/verify_signup");

router.post('/', auth.signin)
router.get('/user/:id', auth.User);

module.exports = router;
