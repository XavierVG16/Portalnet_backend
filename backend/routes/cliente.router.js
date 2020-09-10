const express = require("express");
const router = express.Router();
const cliente = require("../controllers/cliente.controller");
const { report, route } = require("./categoria.routes");
const clienteCtrl = require("../controllers/cliente.controller");

router.get("/", cliente.getclientes);
router.post("/", cliente.createCliente);
router.get("/:id", cliente.getcliente);
router.put("/:id", cliente.editCliente);
router.delete("/:id", cliente.deleteCliente);

module.exports = router;
