const pool = require("../database");

const contratoCtrl = {};


contratoCtrl.getcontratos = async (req, res, next) => {
    const contrato = await pool.query("select * from contrato_servicio inner join cliente on contrato_servicio.idcliente  = cliente.idcliente inner join plan_servicio on contrato_servicio.plan_servicio  = plan_servicio.idplan_servicio inner join factura on contrato_servicio.idcontrato_servicio = factura.contrato_servicio");

    res.json(contrato);
};

contratoCtrl.createContrato = async (req, res, next) => {

    //  console.log(req.body)
    const { id } = req.params
    const idcliente = id;
    console.log(idcliente)
    const { tipo_enlace, tipo_servicio, direccion, dia_instalacion, hora_instalacion } = req.body;

    const row = await pool.query('select * from plan_servicio where nombre_plan = ?', [tipo_servicio]);

    row.forEach(element => {
        plan_servicio = element.idplan_servicio
        total = element.precio

    });
    const newContrato = { idcliente, plan_servicio, tipo_enlace, direccion }

    const contrato = await pool.query('insert contrato_servicio  set ?', newContrato)
    const contrato_servicio = contrato.insertId;
    /**orden instalacion */
    const newOrden = { dia_instalacion, hora_instalacion, contrato_servicio }
    const orden = await pool.query('insert orden_instalacion  set ?', newOrden);
    const id_orden = [orden.insertId];
    /**primera factura */

    const newfactura = { contrato_servicio, total };
    await pool.query('insert factura  set ?', newfactura);
    res.status(200).json(id_orden);



};


contratoCtrl.createDetalleEquipos = async (req, res, next) => {

    const { equipo, cantidad, precio } = req.body;
    const { id } = req.params;
    const orden_instalacion = id
    total_equipo = precio
    const new_detalle = {
        equipo,
        cantidad,
        total_equipo,
        orden_instalacion
    }
    const edit = { total }
    console.log(new_detalle)


    await pool.query('insert into detalle_equipos set ?', new_detalle);

    res.json({ status: 'Contrato creada' });

};
contratoCtrl.getContrato = async (req, res, next) => {
    const { id } = req.params;

    const contrato = await pool.query('select * from contrato_servicio  inner join plan_servicio on contrato_servicio.plan_servicio  = plan_servicio.idplan_servicio   where idcliente = ? ', [id]);
    res.json(contrato);
    console.log(contrato)
};

contratoCtrl.editContrato = async (req, res, next) => {
    const { id } = req.params;

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