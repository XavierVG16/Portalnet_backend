const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let clientSchema = new Schema({
    nombre : String,
    direccion : String,
    telefono : String
});

module.exports = mongoose.model("client", clientSchema);