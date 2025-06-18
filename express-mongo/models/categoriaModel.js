const mongoose = require("mongoose")

const categoriaSchema = new mongoose.Schema({

    nombre: String,
    descripcion: String,
    estado: Boolean
})

module.exports = mongoose.model("categoria", categoriaSchema)