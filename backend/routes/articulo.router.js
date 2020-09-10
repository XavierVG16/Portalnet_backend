const express = require('express');
const router = express.Router();
const articulo = require('../controllers/articulo.controller');
const articuloCtrl = require('../controllers/articulo.controller');
router.get('/',articulo.getArticulos);
router.post('/',articulo.createArticulo);
router.get('/:id',articulo.getArticulo);
router.put('/:id',articulo.editArticulo);
router.delete('/:id',articulo.deleteArticulo);

module.exports= router;