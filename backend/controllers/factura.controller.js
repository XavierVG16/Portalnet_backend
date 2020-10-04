const pool = require("../database");

const facturaCtrl = {};
facturaCtrl.getFacturas = async (req, res, next) => {

    var hoy = new Date();
    var dd = hoy.getDate();
    const n_factura = 1;
    const facturas = await pool.query('select * from contrato_servicio inner join cliente on contrato_servicio.idcliente  = cliente.idcliente inner join plan_servicio on contrato_servicio.plan_servicio  = plan_servicio.idplan_servicio inner join factura on contrato_servicio.idcontrato_servicio = factura.contrato_servicio');
    for (let i = 0; i < facturas.length; i++) {
        const element = facturas[i];
        id = element.idfactura
        contrato_servicio = element.contrato_servicio,
            total = element.total,
            fecha_pago_prox = element.fecha_pago_prox;
        n_f = element.n_factura;

        if (fecha_pago_prox == dd) {
            if (n_f == 0) {

                const newFactura = {
                    contrato_servicio,
                    fecha_pago_prox,
                    total,
                    n_factura

                };
                const editFactura = {
                    n_factura
                };
                console.log(newFactura)
                const up = await pool.query('Update factura set ? where idfactura = ?', [editFactura, id]);

                await pool.query('insert into factura set ?', newFactura);

            }

        }





    }
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
            // await pool.query('insert into factura set ?', newFactura);
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
    const { fecha_actual, fecha_pago_prox } = req.body
    const { idfactura } = req.body;
    const id = idfactura
    const estado = 1;
    const n_factura =0 
    const editFactura = { fecha_actual, fecha_pago_prox, estado , n_factura};
    console.log(id)
    console.log(editFactura)
    const up = await pool.query('Update factura set ? where idfactura = ?', [editFactura, id]);
    console.log(up)
    res.json({ status: 'Servicio Updated' });
};

facturaCtrl.deleteFactura = async (req, res, next) => {
    const { id } = req.params;
    await pool.query('DELETE FROM plan_servicio WHERE idplan_servicio = ?', [id]);
    res.json({ status: 'Servicio Deleted' });
};

module.exports = facturaCtrl;