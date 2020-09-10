const pool = require("../database");
const helpers = require('../lib/helper');

const usuarioCtrl = {};
usuarioCtrl.getUsuarios = async (req, res) => {
  const usuarios = await pool.query("select * from usuario");
  res.json(usuarios);
};

usuarioCtrl.createUsuario = async (req , res) =>{
  const {nombre, apellido, ci, telefono, email, pass_usuario, permiso, imageURL, public_id} = req.body;
  const newUsuario = {
    nombre, apellido, ci, telefono, email, pass_usuario, permiso, imageURL, public_id
  };
  newUsuario.pass_usuario = await helpers.encryptPassword(pass_usuario);

  await pool.query('insert into usuario set ?',newUsuario);
  res.json({status:'Usuario registrado'});
}
usuarioCtrl.getUsuario = async (req, res) =>{
  const {id} = req.params;
  const usuario = await pool.query('select * from usuario where id_usuario = ?',[id]);
  
  res.json(usuario);
}

usuarioCtrl.editUsuario =  async (req, res) =>{
  const {id} = req.params;
  const {nombre, apellido, ci, telefono, email, pass_usuario, permiso} = req.body;
  const editUsuario = {nombre, apellido, ci, telefono, email, pass_usuario, permiso};
  editUsuario.pass_usuario = await helpers.encryptPassword(pass_usuario);
  await pool.query('UPDATE usuario set ? WHERE id_usuario = ?', [editUsuario, id]);
  res.json({status:'usuario Actualizado'});
};

usuarioCtrl.deleteUsuario = async (req, res) =>{
  const {id} = req.params;
  await pool.query('delete from  usuario where public_id = ?', [id]);
  res.json({status:'usuario Eliminado'});

}

module.exports = usuarioCtrl;
