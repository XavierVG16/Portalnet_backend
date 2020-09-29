const express = require("express");
const router = express.Router();
const contrato = require("../controllers/contrato.controller");


router.get("/", contrato.getcontratos)

router.post("/:id", contrato.createContrato);

router.post("/detalle/equipos/:id", contrato.createDetalleEquipos);


module.exports = router