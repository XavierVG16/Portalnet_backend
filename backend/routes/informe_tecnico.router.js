const express = require("express");
const router = express.Router();
const informe = require("../controllers/informe_tecnico.controller");



router.get("/", informe.getInformes);
router.post("/", informe.createInforme);
router.get("/:id", informe.getInforme);
router.put("/:id", informe.editInforme);
router.delete("/:id", informe.deleteInforme);

module.exports = router;
