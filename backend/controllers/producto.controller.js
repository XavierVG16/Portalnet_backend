const pool = require("../database");

const productoCtrl = {};
productoCtrl.getProductos = async (req, res, next) => {
  const producto = await pool.query("select * from productos");

  res.json(producto);
};

productoCtrl.createProducto = async (req, res, next) => {
  const { producto,  precio, cantidad, descripcion } = req.body;
  console.log(req.body)
  
  const newProducto = {
    producto, precio, cantidad, descripcion 
  };
  console.log(newProducto)
  await pool.query('insert into productos  set ?', newProducto);
  res.json({ status: 'producto  creada' });
};
productoCtrl.getProducto = async (req, res, next) => {
  const { id } = req.params;
  const producto = await pool.query('select * from productos  WHERE idproducto =  ?', [id]);
  res.json(producto);
};

productoCtrl.editProducto = async (req, res, next) => {
  const { id } = req.params;
  console.log(id)
  const { producto, precio, cantidad, descripcion } = req.body;
 
  const editProducto = {
    producto, precio, cantidad, descripcion
  };
  await pool.query('UPDATE productos set ? WHERE idproducto = ?', [editProducto, id]);
  res.json({ status: 'producto Updated' });
};

productoCtrl.deleteProducto = async (req, res, next) => {
  const { id } = req.params;
  await pool.query('DELETE FROM productos WHERE idproducto = ?', [id]);
  res.json({ status: 'producto Deleted' });
};

module.exports = productoCtrl;