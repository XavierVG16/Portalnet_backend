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
  const id = await pool.query("insert into cliente set ?", newCliente);

  id_cliente = id.insertId;
  console.log(id_cliente)
  res.json({ status: "Cliente creado" });
};

clienteCtrl.getcliente = async (req, res, next) => {
  const { id } = req.params;
  const cliente = await pool.query(
    "select * from cliente where cedula = ?",
    [id]
  );

  res.json(cliente);
};

clienteCtrl.editCliente = async (req, res, next) => {
  const { id } = req.params;
  const {

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
  await pool.query("update cliente set ? where cedula = ?", [
    editCliente,
    id,
  ]);
  console.log(editCliente);
  res.json("cliente actualizado");
};

clienteCtrl.deleteCliente = async (req, res, next) => {
  const { id } = req.params;

  await pool.query("delete from cliente where cedula = ?", [id]);
  res.json({ status: "Cliente elimiado" });
};
module.exports = clienteCtrl;
