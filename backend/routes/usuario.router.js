const { Router } = require('express');
const router = Router();
const usuario = require('../controllers/usuario.controller');
const auht_js = require('../middlewares/auht_jwt');
const authJwt = require("../middlewares/auht_jwt");
const verify_signup = require("../middlewares/verify_signup");
router.get('/', usuario.getUsuarios);
router.post('/', [verify_signup.checkDuplicateEmail], [auht_js.verifyToken, verify_signup.checkDuplicateEmail], usuario.createUsuario);
router.get('/:id', [verify_signup.checkDuplicateEmail], usuario.getUsuario);
router.put('/:id', [verify_signup.checkDuplicateEmail], usuario.editUsuario);
router.delete('/:id', [verify_signup.checkDuplicateEmail], usuario.deleteUsuario);

module.exports = router;