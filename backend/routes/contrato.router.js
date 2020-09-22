const express = require("express");
const router = express.Router();
const contrato = require("../controllers/contrato.controller");




router.post("/", contrato.createContrato);

router.post("/detalle", contrato.createDetalleEquipos);


module.exports = router