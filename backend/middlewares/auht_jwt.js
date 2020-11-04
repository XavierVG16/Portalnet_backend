const jwt = require("jsonwebtoken");
const auht_js = {}
auht_js.verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        console.log(decoded)

        const user = await pool.query('select * from usuarios where idusuario = ?', req.userId)
        console.log(user)
        if (!user) return res.status(404).json({ message: "No user found" });

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};
module.exports = auht_js;