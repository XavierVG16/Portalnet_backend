const pool = require("../database");

const proveedorCtrl = {};
proveedorCtrl.getProveedores = async (req, res, next) => {
    const proveedor = await pool.query("select * from proveedor");

    res.json(proveedor);
};

proveedorCtrl.createProveedor = async (req, res, next) => {
    const { proveedor_nombre, email, telefono, direccion, nombre_beneficiario, n_cuenta, cedula, banco, tipo_cuenta, beneficiario, descripcion_p } = req.body;

    const newProveedor = {
        proveedor_nombre,
        email,
        telefono,
        direccion,
        nombre_beneficiario,
        n_cuenta,
        cedula,
        banco, tipo_cuenta, beneficiario, descripcion_p
    };
    await pool.query('insert into proveedor  set ?', newProveedor);
    res.json({ status: 'proveedor  creada' });
};
proveedorCtrl.getProveedor = async (req, res, next) => {
    const { id } = req.params;
    const proveedor = await pool.query('SELECT * FROM proveedor WHERE id_proveedor =  ?', [id]);
    res.json(proveedor);
};

proveedorCtrl.editProveedor = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const { proveedor_nombre, email, telefono, direccion, nombre_beneficiario, n_cuenta, cedula, banco, tipo_cuenta, beneficiario, descripcion_p } = req.body;

    const editProveedor = {

        proveedor_nombre,
        email,
        telefono,
        direccion,
        nombre_beneficiario,
        n_cuenta,
        cedula,
        banco, tipo_cuenta, beneficiario, descripcion_p
    };
    await pool.query('UPDATE proveedor set ? WHERE id_proveedor = ?', [editProveedor, id]);
    res.json({ status: 'Provedor Updated' });
};

proveedorCtrl.deleteProveedor = async (req, res, next) => {
    const { id } = req.params;
    await pool.query('DELETE FROM proveedor WHERE id_proveedor = ?', [id]);
    res.json({ status: 'proveedor Deleted' });
};

module.exports = proveedorCtrl;