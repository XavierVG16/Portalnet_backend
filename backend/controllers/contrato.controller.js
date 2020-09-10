const pool = require("../database");

const contratoCtrl = {};
contratoCtrl.getcontratos = async (req, res, next) => {
    const contrato = await pool.query("select * from contrato_servicio");

    res.json(contrato);
};

contratoCtrl.createContrato = async (req, res, next) => {
    const { cedula, nombre, apellido, direccion, referencia } = req.body;

    // IMNGRESAR clientes
    const newCliente = {
        cedula, nombre, apellido, direccion, referencia
    };
    await pool.query('insert into cliente  set ?', newCliente);
    //----------------------------------------------------------------------------------//
    //orden Instalacion
    const { dia_instalacion, hora_instalacion } = req.body;

    const newOrden_instalacion = await pool.query('insert into orden_instalacion  set ?', newCliente)
    const idorden_instalacion = newOrden_instalacion.insertId;
    //----------------------------------------------------------------------------------//
    //detalle oreden instalacion
    const { nombre_equipo, cantidad } = req.body;
    const row_equipo = await pool.query("select * from equipos  where  equipo = ? ", nombre_equipo);
    row_equipo.forEach(element => {
        equipo = idequipo.element
        precio = precio.element
    });
    const total = precio * cantidad;
    const new_detalle = { equipo, cantidad, total, idorden_instalacion };

    const newOrden_instalacion = await pool.query('insert detalle_equipos  set ?', new_detalle);
    //----------------------------------------------------------------------------------//
    // contrato 



    res.json({ status: 'Categoria creada' });
};
contratoCtrl.getContrato = async (req, res, next) => {
    const { id } = req.params;
    const servicio = await pool.query('SELECT * FROM plan_servcio WHERE idplan_servicio =  ?', [id]);
    res.json(servicio);
};

contratoCtrl.editContrato = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const { nombre_plan, descripcion, precio, cantidad_megas } = req.body;
    const subida_kbps = cantidad_megas * 1024;
    const bajada_kbps = cantidad_megas * 1024;
    const edCategoria = {
        nombre_plan,
        descripcion,
        precio,
        cantidad_megas,
        subida_kbps,
        bajada_kbps
    };
    await pool.query('UPDATE plan_servicio set ? WHERE idplan_servicio = ?', [edCategoria, id]);
    res.json({ status: 'Servicio Updated' });
};

contratoCtrl.deleteContrato = async (req, res, next) => {
    const { id } = req.params;
    await pool.query('DELETE FROM plan_servicio WHERE idplan_servicio = ?', [id]);
    res.json({ status: 'Servicio Deleted' });
};

module.exports = contratoCtrl;