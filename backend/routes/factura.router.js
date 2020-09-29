const express = require("express");
const router = express.Router();
const factura = require("../controllers/factura.controller");

router.get("/", factura.getFacturas);




module.exports = router