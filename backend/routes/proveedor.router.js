const express = require('express');
const router = express.Router();

const proveedor = require('../controllers/proveedor.controller');

router.get('/', proveedor.getProveedores);
router.post('/', proveedor.createProveedor);
router.get('/:id',proveedor.getProveedor);
router.put('/:id', proveedor.editProveedor);
router.delete('/:id', proveedor.deleteProveedor);

module.exports = router;