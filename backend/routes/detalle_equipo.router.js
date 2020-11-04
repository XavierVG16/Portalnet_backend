const express = require("express");
const detalle_equiposCtrl = require("../controllers/detalle_equipos.controller");
const router = express.Router();
const detalle_equipo = require('../controllers/detalle_equipos.controller');
const { route } = require("./auth.router");

router.get('/', detalle_equipo.getDetalle_equipos);
router.get('/:id', detalle_equipo.getDetalle_equipo);

module.exports = router;