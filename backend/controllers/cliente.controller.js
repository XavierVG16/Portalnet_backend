const pool = require("../database");

const clienteCtrl = {};

clienteCtrl.getclientes = async (req, res) => {
  const cliente = await pool.query("select * from cliente");
  res.json(cliente);
};

clienteCtrl.createCliente = async (req, res) => {
  const {
    nombre,
    apellido,
    num_documento,
    direccion,
    telefono,
    email
  } = req.body;
  const newCliente = {
    nombre,
    apellido,
    num_documento,
    direccion,
    telefono,
    email
  };
  await pool.query("insert into cliente set ?", newCliente);

  res.json({ status: "Cliente creado" });
};

clienteCtrl.getcliente = async (req, res) => {
  const { id } = req.params;
  const cliente = await pool.query(
    "select * from cliente where idpersona = ?",
    [id]
  );

  res.json(cliente);
};

clienteCtrl.editCliente = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    num_documento,
    direccion,
    telefono,
    email
  } = req.body;
  const editCliente = {
    nombre,
    apellido,
    num_documento,
    direccion,
    telefono,
    email
  };
  await pool.query("update cliente set ? where idpersona = ?", [
    editCliente,
    id,
  ]);
  console.log(editCliente);
  res.json("cliente actualizado");
};

clienteCtrl.deleteCliente = async (req, res) => {
  const { id } = req.params;

  await pool.query("delete from cliente where idpersona = ?", [id]);
  res.json({ status: "Cliente elimiado" });
};
module.exports = clienteCtrl;
