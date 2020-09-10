const pool = require("../database");
const { unlink } = require("fs-extra");
const fs = require("fs-extra");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const articuloCtrl = {};
articuloCtrl.getArticulos = async (req, res) => {
  const articulos = await pool.query(
    "select * from articulo articulo inner join categoria on articulo.idcategoria = categoria.idcategoria"
  );
  res.json(articulos);
};

articuloCtrl.createArticulo = async (req, res) => {
  const { categoria, codigo, producto, stock, descripcion } = req.body;
  const row = await pool.query("select * from categoria where nombre = ?", [
    categoria,
  ]);
  row.forEach((element) => {
    idcategoria = element.idcategoria;
  });

  const result = await cloudinary.v2.uploader.upload(req.file.path);

  const newArticulo = {
    idcategoria,
    codigo,
    producto,
    stock,
    descripcion,
    imageURL: result.url,
    public_id: result.public_id,
  };
  console.log(newArticulo);
  await pool.query("insert into articulo set ?", [newArticulo]);

  await fs.unlink(req.file.path);
};
articuloCtrl.getArticulo = async (req, res) => {
  const { id } = req.params;
  const articulo = await pool.query(
    "select * from articulo inner join categoria on articulo.idcategoria = categoria.idcategoria where idarticulo = ?",
    id
  );
  res.json(articulo);
};

articuloCtrl.editArticulo = async (req, res) => {
  const { id } = req.params;

  const { codigo, producto, stock, descripcion, categoria } = req.body;
  const row = await pool.query("select * from categoria where nombre = ?", [
    categoria,
  ]);
  row.forEach((element) => {
    idcategoria = element.idcategoria;
  });
  const EditArticulo = {
    idcategoria,
    codigo,
    producto,
    stock,
    descripcion
  };

 const edit = await pool.query("update articulo set ? where  idarticulo =?", [
    EditArticulo,
    id
  ]);
console.log(edit)
  res.json({ status: "Articulo  Updated" });
};

articuloCtrl.deleteArticulo = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM articulo WHERE public_id = ?", [id]);
  const resutl = await cloudinary.v2.uploader.destroy(id);
  res.json({ status: "Articulo delete" });
};

module.exports = articuloCtrl;
