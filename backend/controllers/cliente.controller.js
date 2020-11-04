const pool = require("../database");

const clienteCtrl = {};

var id_cliente;

clienteCtrl.getclientes = async (req, res, next) => {
    const cliente = await pool.query("select * from cliente");
    res.json(cliente);
};

clienteCtrl.createCliente = async (req, res, next) => {
    const {
        cedula,
        nombre,
        apellido,
        direccion,
        propiedad,
        referencia,
        estado,
        descripcion_estado,
        email,
        telefono

    } = req.body;
    const newCliente = {
        cedula,
        nombre,
        apellido,
        direccion,
        propiedad,
        referencia,
        estado,
        descripcion_estado,
        email,
        telefono
    };
    try {
        const rows = await pool.query('select * from cliente where cedula = ?', cedula)
        if (rows.length != 0) {
            const cliente = rows[0]

            res.status(401).json({ status: "El cliente ya esta registrado", cliente });


        } else {
            const id = await pool.query("insert into cliente set ?", newCliente);
            const cliente = id.insertId
            res.status(200).json(cliente);
        }


    } catch (error) {
        console.log(error)

    }

};
clienteCtrl.estadoCliente = async (req, res, next) => {
    const { estado } = req.body
    const { id } = req.params
    try {
        await pool.query("update cliente set estado = ? where idcliente = ?", [estado, id]);

    } catch (error) {
        console.log(error)
    }

}
clienteCtrl.getcliente = async (req, res, next) => {
    const { id } = req.params;
    const clientes = await pool.query("select * from cliente where idcliente = ?", [id]);
    const cliente = clientes[0]

    res.json(cliente);

};

clienteCtrl.editCliente = async (req, res, next) => {
    const { id } = req.params;
    const {
        cedula,
        nombre,
        apellido,
        direccion,
        propiedad,
        referencia,
        estado,
        descripcion_estado,
        email,
        telefono
    } = req.body;
    const editCliente = {
        cedula,
        nombre,
        apellido,
        direccion,
        propiedad,
        referencia,

        email,
        telefono
    };
    const p = await pool.query("update cliente set ? where idcliente = ?", [editCliente, id,]);
    console.log(p);
    res.json("cliente actualizado");
};

clienteCtrl.deleteCliente = async (req, res, next) => {
    const { id } = req.params;
    try {
        await pool.query("delete from cliente where idcliente = ?", [id]);
        res.json({ status: "Cliente elimiado" });

    } catch (error) {
        console.log(error)
    }

};
module.exports = clienteCtrl;
