const pool = require("../database");

const equipoCtrl = {};
equipoCtrl.getEquipos = async (req, res, next) => {
    const equipo = await pool.query("select * from equipos inner join proveedor on equipos.proveedor= proveedor.id_proveedor");

    res.json(equipo);
};

equipoCtrl.createEquipo = async (req, res, next) => {
    const { equipo, cantidad, precio, serie, _proveedor_nombre , descripcion } = req.body;
    console.log(req.body)
   const row = await pool.query('select * from proveedor where proveedor_nombre = ?', _proveedor_nombre);
    row.forEach(element => {
      proveedor = element.id_proveedor
    });
    const newEquipo = {
        equipo,
        cantidad,
        precio,
        serie,
        proveedor,
        descripcion
    };
    console.log(newEquipo)
      await pool.query('insert into equipos  set ?', newEquipo);
    res.json({ status: 'equipo  creada' });
};
equipoCtrl.getEquipo = async (req, res, next) => {
    const { id } = req.params;
    const equipo = await pool.query('select * from equipos inner join proveedor on equipos.proveedor= proveedor.id_proveedor  WHERE idequipo =  ?', [id]);
    res.json(equipo);
};

equipoCtrl.editEquipo = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const { equipo, cantidad, precio, serie, _proveedor_nombre, descripcion } = req.body;
    const row = await pool.query('select * from proveedor where proveedor_nombre = ?', _proveedor_nombre);
    row.forEach(element => {
        proveedor = element.id_proveedor
    });
    const editEquipo = {
        equipo, cantidad, precio, serie, proveedor, descripcion
    };
    await pool.query('UPDATE equipos set ? WHERE idequipo = ?', [editEquipo, id]);
    res.json({ status: 'equipo Updated' });
};

equipoCtrl.deleteEquipo = async (req, res, next) => {
    const { id } = req.params;
    await pool.query('DELETE FROM equipos WHERE idequipo = ?', [id]);
    res.json({ status: 'equipo Deleted' });
};

module.exports = equipoCtrl;