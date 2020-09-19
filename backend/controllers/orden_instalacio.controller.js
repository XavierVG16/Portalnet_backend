const pool = require("../database");
var id_orden
const orden_instalacionCtrl = {};
orden_instalacionCtrl.getOrden_instalaciones = async (req, res, next) => {
    const orden_i = await pool.query("select * from orden_instalacion");
    console.log(id_orden);
    res.json(orden_i);
};

orden_instalacionCtrl.createOrden_instalacion = async (req, res, next) => {
    const { dia_instalacion, hora_instalacion } = req.body;

    const newOrden = {
        dia_instalacion, hora_instalacion
    };


    const id = await pool.query('insert into orden_instalacion  set ?', newOrden);
    console.log(id)
    id_orden = id.insertId
    if(id_orden != 0){
        const { equipo, cantidad } = req.body;
        //insertar equipo
        console.log ('existe Orden');
        
    }
    res.json({ status: 'orden  creada' });
};
orden_instalacionCtrl.getOrden_instalacion = async (req, res, next) => {
    const { id } = req.params;
    const orden = await pool.query('select * from orden_instalacion  WHERE idorden_instalacion =  ?', [id]);
    console.log(id_orden);
    res.json(orden);
};

orden_instalacionCtrl.editOrden_instalacion = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const { dia_instaslacion, hora_instalacion, total } = req.body;

    const editOrden = {
        dia_instaslacion, hora_instalacion, total
    };
    await pool.query('UPDATE orden_instalacion set ? WHERE idorden_instalacion = ?', [editEquipo, id]);
    res.json({ status: 'equipo Updated' });
};

orden_instalacionCtrl.deleteOrden_instalacion = async (req, res, next) => {
    const { id } = req.params;
    await pool.query('DELETE FROM orden_instalacion WHERE idorden_instalacion = ?', [id]);
    res.json({ status: 'equipo Deleted' });
};

module.exports = orden_instalacionCtrl;