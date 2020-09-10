const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let saleSchema = new Schema({
    fecha : {
        type: Date,
        default: Date.now
    },
    valor_total: Number,
    cliente : {
        type: Schema.Types.ObjectId,
        ref : "client"
    },
    products : [{
        products : {
            type: Schema.Types.ObjectId,
            ref : "product"
        },
        cantidad : Number
    }]
});

module.exports = mongoose.model("sale", saleSchema);