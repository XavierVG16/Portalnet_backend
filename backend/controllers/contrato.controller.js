const pool = require("../database");

const contratoCtrl = {};

var idorden_instalacion;
var orden_f;
contratoCtrl.getcontratos = async (req, res, next) => {
    //    const contrato = await pool.query("select * from contrato_servicio");

    res.json(contrato);
};

contratoCtrl.createContrato = async (req, res, next) => {


    const { cedula, nombre, apellido, direccion, referencia, telefono, email } = req.body;

    // IMNGRESAR clientes
    const newCliente = {
        cedula, nombre, apellido, direccion, referencia, telefono, email
    };
    const cliente = await pool.query('insert into cliente  set ?', newCliente);

    const idcliente = cliente.insertId


    //----------------------------------------------------------------------------------//
    //orden Instalacion
    const { dia_instalacion, hora_instalacion } = req.body;
    const newOrden = { dia_instalacion, hora_instalacion }

    const Orden_instalacion = await pool.query('insert into orden_instalacion  set ?', newOrden)
    idorden_instalacion = Orden_instalacion.insertId;
    /** urado en una session */
    req.session.idorden = { dia_instalacion };
    req.flash('s', idorden_instalacion );
    orden_f = dia_instalacion;


    //----------------------------------------------------------------------------------//
    /** contrato */
    const { tipo_enlace, wifi_nombre, wifi_clave, tipo_servicio } = req.body;
    const row = await pool.query('select * from plan_servicio where nombre_plan = ?', [tipo_servicio]);
    row.forEach(element => {
        plan_servicio = element.idplan_servicio
    });
    const newContrato = { idcliente, plan_servicio, tipo_enlace, wifi_nombre, wifi_clave, idorden_instalacion }

    await pool.query('insert contrato_servicio  set ?', newContrato)

    res.json({ status: 'Categoria creada' });
};


contratoCtrl.createDetalleEquipos = async (req, res, next) => {

    const { cantidad, precio } = req.body

    const array = req.body;

  //   console.log(idorden_instalacion)
    console.log(req.flash('s'))
    ;
   // console.log(req.session.idorden);
    /**       const total = 0;
      for (let index = 0; index < array.length; index++) {
          const rows = array[index];
          const cantidad = rows.cantidad;
          const equipo = rows.equipo;
          const total_equipo = rows.precio;
          total = total + total_equipo
  
  
  
  
          if (cantidad != '') {
              const new_detalle = {
                  equipo,
                  cantidad,
                  total_equipo,
                  orden_instalacion
  
              }
              //   await pool.query('insert into detalle_equipos set ?', new_detalle);
  
  
          }
  
  
  
      }
  */
    //   await pool.query('Update  orden_instalacion set ? where idorden_instalacion = ?', [total, orden_instalacion])

    res.json({ status: 'Contrato creada' });
};
contratoCtrl.getContrato = async (req, res, next) => {
    const { id } = req.params;
    const servicio = await pool.query('SELECT * FROM plan_servcio WHERE idplan_servicio =  ?', [id]);
    res.json(servicio);
};

contratoCtrl.editContrato = async (req, res, next) => {
    const { id } = req.params;

    const { nombre_plan, descripcion, precio, cantidad_megas } = req.body;
    const subida_kbps = cantidad_megas * 1024;
    const bajada_kbps = cantidad_megas * 1024;
    const edCategoria = {
        nombre_plan,
        descripcion,
        precio,
        cantidad_megas,
        subida_kbps,
        bajada_kbps
    };
    await pool.query('UPDATE plan_servicio set ? WHERE idplan_servicio = ?', [edCategoria, id]);
    res.json({ status: 'Servicio Updated' });
};

contratoCtrl.deleteContrato = async (req, res, next) => {
    const { id } = req.params;
    await pool.query('DELETE FROM plan_servicio WHERE idplan_servicio = ?', [id]);
    res.json({ status: 'Servicio Deleted' });
};

module.exports = contratoCtrl;