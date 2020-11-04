const pool = require("../database");

const facturaCtrl = {};
facturaCtrl.getFacturas = async (req, res, next) => {


    const facturas = await pool.query('select * from contrato_servicio inner join cliente on contrato_servicio.idcliente  = cliente.idcliente inner join plan_servicio on contrato_servicio.plan_servicio  = plan_servicio.idplan_servicio inner join factura on contrato_servicio.idcontrato_servicio = factura.contrato_servicio');

    res.json(facturas);


};

facturaCtrl.createFactura = async (req, res, next) => {

    var hoy = new Date();
    var dd = hoy.getDate();
    const facturas = await pool.query('select * from contrato_servicio inner join cliente on contrato_servicio.idcliente  = cliente.idcliente inner join plan_servicio on contrato_servicio.plan_servicio  = plan_servicio.idplan_servicio inner join factura on contrato_servicio.idcontrato_servicio = factura.contrato_servicio');
    for (let i = 0; i < facturas.length; i++) {
        const element = facturas[i];

        contrato_servicio = element.contrato_servicio,
            total = element.total,
            fecha_pago_prox = element.fecha_pago_prox;
        if (fecha_pago_prox == dd) {
            const newFactura = {
                contrato_servicio,
                total,
                fecha_pago_prox
            };
            console.log(newFactura)
        }




    }
    res.json({ status: 'Categoria creada' });
};
facturaCtrl.getFactura = async (req, res, next) => {
    const { id } = req.params;
    const factura = await pool.query('select * from contrato_servicio inner join cliente on contrato_servicio.idcliente  = cliente.idcliente inner join plan_servicio on contrato_servicio.plan_servicio  = plan_servicio.idplan_servicio inner join factura on contrato_servicio.idcontrato_servicio = factura.contrato_servicio where cliente.cedula = ? ORDER BY factura.estado ASC', [id]);
    res.json(factura);
};

facturaCtrl.editFactura = async (req, res, next) => {
    const { idusuario, fecha_pago2, fecha_pago_prox } = req.body
    const { idfactura } = req.body;
    const id = idfactura
    const estado = 1;
    const n_factura = 0
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yy = hoy.getFullYear();
    const fecha_actual = yy + '-' + mm + '-' + dd;

    if (fecha_pago2 != '') {

        var fecha_pago = fecha_pago2;


        const editFactura = { fecha_actual, fecha_pago, fecha_pago_prox, estado, n_factura, idusuario };
        const up = await pool.query('Update factura set ? where idfactura = ?', [editFactura, id]);

    }
    if (req.body.fecha_pago != '') {

        const { fecha_pago } = req.body;
        const editFactura = { fecha_actual, fecha_pago, fecha_pago_prox, estado, n_factura, idusuario };
        console.log(req.body)
        const up = await pool.query('Update factura set ? where idfactura = ?', [editFactura, id]);

    }

    fecha_pago = '';
    const factura = await pool.query('select * from factura where idfactura = ?', [id])


    const f = factura[0];

    const contrato_servicio = f.contrato_servicio;
    fecha_pago = f.fecha_pago_prox;
    const total = f.total;
    const newFactura = {
        fecha_pago,
        contrato_servicio,
        total
    }


    await pool.query('insert into factura set  ?', newFactura);





    res.json({ status: 'Servicio Updated' });
};

facturaCtrl.deleteFactura = async (req, res, next) => {
    const { id } = req.params;
    await pool.query('DELETE FROM plan_servicio WHERE idplan_servicio = ?', [id]);
    res.json({ status: 'Servicio Deleted' });
};

module.exports = facturaCtrl;