const pool = require("../database");
const helpers = require('../lib/helper');
const usuarioCtrl = {};
usuarioCtrl.getUsuarios = async (req, res, next) => {
  const equipo = await pool.query("select * from usuarios");

  res.json(equipo);
};

usuarioCtrl.createUsuario = async (req, res, next) => {
  const { nombre, apellido, email, pass_usuario, tipo_usuario } = req.body;
  console.log(req.body)

  const newUsuario = {
    nombre, apellido, email, pass_usuario, tipo_usuario
  };
  newUsuario.pass_usuario = await helpers.encryptPassword(pass_usuario);

  await pool.query('insert into usuario  set ?', newUsuario);
  res.json({ status: 'usuario creada' });
};
usuarioCtrl.getUsuario = async (req, res, next) => {
  const { id } = req.params;
  const usuario = await pool.query('select * from usuarios  WHERE idusuario =  ?', [id]);
  res.json(usuario);
};

usuarioCtrl.editUsuario = async (req, res, next) => {
  const { id } = req.params;

  const { nombre, apellido, email, pass_usuario, tipo_usuario } = req.body;

  const editUsuario = {
    nombre, apellido, email, pass_usuario, tipo_usuario
  };
  await pool.query('UPDATE usuarios set ? WHERE idusuario = ?', [editUsuario, id]);
  res.json({ status: 'usuario Updated' });
};

usuarioCtrl.deleteUsuario = async (req, res, next) => {
  const { id } = req.params;
  await pool.query('DELETE FROM usuarios WHERE idusuario = ?', [id]);
  res.json({ status: 'usuario Deleted' });
};

module.exports = usuarioCtrl;