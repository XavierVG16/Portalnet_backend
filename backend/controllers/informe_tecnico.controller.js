const pool = require("../database");

const informeCtrl = {};
informeCtrl.getInformes = async (req, res, next) => {
    const infommes = await pool.query("select * informe_tecnico");

    res.json(producto);
};

informeCtrl.createInforme = async (req, res, next) => {
    const { wifi_nombre, wifi_clave, antena_receptora_cpe, antena_emisora_ap, router_acceso_remoto, ip_lan, ip_wan, potencia, aliniacion_antena, ruta, nap, puerto, detalle_equipo } = req.body;
    const informe = { wifi_nombre, wifi_clave, antena_receptora_cpe, antena_emisora_ap, router_acceso_remoto, ip_lan, ip_wan, potencia, aliniacion_antena, ruta, nap, puerto, detalle_equipo };
    console.log(newProducto)
    await pool.query('insert into informe_tecnico set ?', informe);
    res.json({ status: 'informe  creada' });
};
informeCtrl.getInforme = async (req, res, next) => {
    const { id } = req.params;
    const producto = await pool.query('select * from informe_tecnico  WHERE idinfo_tec =  ?', [id]);
    res.json(producto);
};

informeCtrl.editInforme = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)


    const { wifi_nombre, wifi_clave, antena_receptora_cpe, antena_emisora_ap, router_acceso_remoto, ip_lan, ip_wan, potencia, aliniacion_antena, ruta, nap, puerto } = req.body.informe;
    const edit = { wifi_nombre, wifi_clave, antena_receptora_cpe, antena_emisora_ap, router_acceso_remoto, ip_lan, ip_wan, potencia, aliniacion_antena, ruta, nap, puerto };

    const u = await pool.query('UPDATE informe_tecnico set ? WHERE idinfo_tec = ?', [edit, id]);
    console.log(u)
    res.json({ status: 'producto Updated' });
};

informeCtrl.deleteInforme = async (req, res, next) => {
    const { id } = req.params;
    await pool.query('DELETE FROM informe_tecnico WHERE idinfo_tec = ?', [id]);
    res.json({ status: 'producto Deleted' });
};

module.exports = informeCtrl;  