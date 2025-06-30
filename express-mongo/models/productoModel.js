const mongoose = require("mongoose")

const schema = mongoose.Schema
const productoSchema = new mongoose.Schema({

    nombre: String,
    descripcion: String,
    precio: Number,
    estado: Boolean,
    categoria: { type: schema.Types.ObjectId, ref: "categoria" }
})

module.exports = mongoose.model("producto", productoSchema)