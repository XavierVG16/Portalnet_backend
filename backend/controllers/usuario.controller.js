const pool = require("../database");
const helpers = require('../lib/helper');
const jwt = require("jsonwebtoken");
const usuarioCtrl = {};
usuarioCtrl.getUsuarios = async (req, res, next) => {
  const equipo = await pool.query("select * from usuarios");

  res.json(equipo);
};

usuarioCtrl.createUsuario = async (req, res, next) => {
  const { nombre, apellido, email, pass_usuario, t_usuario, telefono } = req.body;


  const newUsuario = {
    nombre, apellido, email, pass_usuario, t_usuario, telefono
  };
  newUsuario.pass_usuario = await helpers.encryptPassword(pass_usuario);

  const user = await pool.query('insert into usuarios  set ?', newUsuario);
  console.log(user)
  const token = jwt.sign({ id: user.insertId }, process.env.SECRET);

  res.status(200).send({
    token: token
  });
};
usuarioCtrl.getUsuario = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  const usuario = await pool.query('select * from usuarios  WHERE idusuario =  ?', [id]);
  res.json(usuario);
};

usuarioCtrl.editUsuario = async (req, res, next) => {
  const { id } = req.params;

  const { nombre, apellido, email, pass_usuario, t_usuario, telefono } = req.body;

  const editUsuario = {
    nombre, apellido, email, pass_usuario, t_usuario, telefono
  };
  editUsuario.pass_usuario = await helpers.encryptPassword(pass_usuario);
  await pool.query('UPDATE usuarios set ? WHERE idusuario = ?', [editUsuario, id]);
  res.json({ status: 'usuario Updated' });
};

usuarioCtrl.deleteUsuario = async (req, res, next) => {
  const { id } = req.params;
  await pool.query('DELETE FROM usuarios WHERE idusuario = ?', [id]);
  res.json({ status: 'usuario Deleted' });
};

module.exports = usuarioCtrl;