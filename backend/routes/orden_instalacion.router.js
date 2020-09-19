const express = require('express');
const router = express.Router();

const orden = require('../controllers/orden_instalacio.controller');

router.get('/', orden.getOrden_instalaciones);
router.post('/', orden.createOrden_instalacion);
router.get('/:id', orden.getOrden_instalacion);
router.put('/:id', orden.editOrden_instalacion);
router.delete('/:id', orden.deleteOrden_instalacion);

module.exports = router;