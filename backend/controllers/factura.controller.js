const pool = require("../database");

const facturaCtrl = {};
facturaCtrl.getFacturas = async (req, res, next) => {
    const facturas = await pool.query('select * from contrato_servicio inner join cliente on contrato_servicio.idcliente  = cliente.idcliente inner join plan_servicio on contrato_servicio.plan_servicio  = plan_servicio.idplan_servicio inner join factura on contrato_servicio.idcontrato_servicio = factura.contrato_servicio');

    res.json(facturas );


};

facturaCtrl.createFactura = async (req, res, next) => {
    const { nombre_plan, descripcion, precio, cantidad_megas, comparticion } = req.body;
    const subida_kbps = cantidad_megas * 1024;
    const bajada_kbps = cantidad_megas * 1024;
    const m_subida_kbps = subida_kbps / 4;
    const m_bajada_kbps = bajada_kbps / 4;

    const newServicio = {
        nombre_plan,
        descripcion,
        precio,
        cantidad_megas,
        subida_kbps,
        bajada_kbps, comparticion, m_subida_kbps, m_bajada_kbps
    };
    const servicio = await pool.query('insert into plan_servicio  set ?', newServicio);

    res.json({ status: 'Categoria creada' });
};
facturaCtrl.getFactura = async (req, res, next) => {
    const { id } = req.params;
    const factura = await pool.query('select * from contrato_servicio inner join cliente on contrato_servicio.idcliente  = cliente.idcliente inner join plan_servicio on contrato_servicio.plan_servicio  = plan_servicio.idplan_servicio inner join factura on contrato_servicio.idcontrato_servicio = factura.contrato_servicio where cliente.cedula = ? ORDER BY factura.estado ASC', [id]);
    res.json(factura);
};

facturaCtrl.editFactura = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const { nombre_plan, descripcion, precio, cantidad_megas, comparticion } = req.body;
    const subida_kbps = cantidad_megas * 1024;
    const bajada_kbps = cantidad_megas * 1024;
    const m_subida_kbps = subida_kbps / 4;
    const m_bajada_kbps = bajada_kbps / 4;
    const edCategoria = {
        nombre_plan,
        descripcion,
        precio,
        cantidad_megas,
        subida_kbps,
        bajada_kbps, comparticion, m_subida_kbps, m_bajada_kbps
    };
    await pool.query('UPDATE plan_servicio set ? WHERE idplan_servicio = ?', [edCategoria, id]);
    res.json({ status: 'Servicio Updated' });
};

facturaCtrl.deleteFactura = async (req, res, next) => {
    const { id } = req.params;
    await pool.query('DELETE FROM plan_servicio WHERE idplan_servicio = ?', [id]);
    res.json({ status: 'Servicio Deleted' });
};

module.exports = facturaCtrl;