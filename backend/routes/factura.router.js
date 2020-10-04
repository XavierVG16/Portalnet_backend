const express = require("express");
const router = express.Router();
const factura = require("../controllers/factura.controller");

router.get("/", factura.getFacturas);
router.get("/:id", factura.getFactura);
router.post("/", factura.createFactura);
router.put("/",factura.editFactura);




module.exports = router