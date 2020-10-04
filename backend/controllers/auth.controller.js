const pool = require("../database");
const jwt = require("jsonwebtoken");
const helpers = require("../lib/helper");
const authCtrl = {};
authCtrl.signin = async (req, res, next) => {
    const { email, pass_usuario } = req.body

    const usuarioC = await pool.query('select * from usuarios where email = ?', email)
    console.log(usuarioC)
    if (usuarioC.length == 0) {
        return res.status(400).json({ message: 'ususario no encontrado' })

        
    } else {
        const user = usuarioC[0];
        const validPassword = await helpers.matchPassword(pass_usuario, user.pass_usuario);
        if (!validPassword) {
            return res.status(400).json({ message: 'contrasena incorrecta' })


        }
        const token =jwt.sign(user.idusuario, 'dsdsd')
        res.json({ token })
    }

}
module.exports = authCtrl;