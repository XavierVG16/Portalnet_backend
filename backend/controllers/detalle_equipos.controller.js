const pool = require("../database");

const detalle_equiposCtrl = {};
detalle_equiposCtrl.getDetalle_equipos = async (req, res, next) => {
    const detalle_equipo = pool.query('select * from detalle_equipos');
    res.json(detalle_equipo);
}

detalle_equiposCtrl.getDetalle_equipo = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const detalle_equipo = pool.query('select * from detalle_equipos INNER JOIN orden_instalacion on detalle_equipos.orden_instalacion= orden_instalacion.idorden_instalacion INNER JOIN equipos on detalle_equipos.equipo = equipos.idequipo  where orden_instalacion = ?', [id])
}

module.exports = detalle_equiposCtrl;