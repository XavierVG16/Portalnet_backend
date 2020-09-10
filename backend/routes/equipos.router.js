const express = require('express');
const router = express.Router();

const equipos = require('../controllers/equipos.controller');

router.get('/', equipos.getEquipos);
router.post('/', equipos.createEquipo);
router.get('/:id', equipos.getEquipo);
router.put('/:id', equipos.editEquipo);
router.delete('/:id', equipos.deleteEquipo);

module.exports = router;