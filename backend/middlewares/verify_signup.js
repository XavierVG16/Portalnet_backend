const jwt = require("jsonwebtoken");
const pool = require("../database");
const verifyToken = {}
verifyToken.checkDuplicateEmail = async (req, res, next) => {
    try {

        const email = await pool.query('select * from usuarios  WHERE email =  ?', [req.body.email]);

        if (email)
            return res.status(400).json({ message: "EL email ya existe!" });
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
module.exports = verifyToken;