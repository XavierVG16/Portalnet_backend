const pool = require("../database");

const detalle_equiposCtrl = {};
detalle_equiposCtrl.getDetalle_equipos = async (req, res, next) => {
    const detalle_equipo = await pool.query('select * from detalle_equipos');
    res.json(detalle_equipo);
}

detalle_equiposCtrl.getDetalle_equipo = async (req, res, next) => {
    const { id } = req.params;

    const detalle_equipo = await pool.query('select * from detalle_equipos INNER JOIN orden_instalacion on detalle_equipos.orden_instalacion= orden_instalacion.idorden_instalacion INNER JOIN equipos on detalle_equipos.equipo = equipos.idequipo  inner join informe_tecnico on detalle_equipos.iddetalle_equipo = informe_tecnico.detalle_equipo where orden_instalacion = ?', [id]);
    res.json(detalle_equipo)
}

detalle_equiposCtrl.deleteDetalle_equipo = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const detalle_equipo = await pool.query('delete from detalle_equipos  where iddetalle_equipo = ?', [id]);
    res.json({ status: 'eliminado' })
}

module.exports = detalle_equiposCtrl;