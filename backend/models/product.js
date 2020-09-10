const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productSchema = new Schema({
    nombre : String,
    precio : Number,
    categoria : String,
    cantidad : Number,
    imagen : String
});

module.exports = mongoose.model("product", productSchema);