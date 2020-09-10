const express = require('express');
const router = express.Router();

const servicio = require('../controllers/servicio.controller');

router.get('/', servicio.getServicios);
router.post('/', servicio.createServicio);
router.get('/:id', servicio.getServicio);
router.put('/:id', servicio.editServicio);
router.delete('/:id', servicio.deleteServicio);

module.exports = router;