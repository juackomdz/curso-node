const express = require("express")
const router = express.Router()

const Categoria = require("../models/categoriaModel")


router.post("/", (req, res) => {
    let body = req.body
    let categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion,
        estado: true
    })

    return categoria.save()
        .then(res.status(201).json({ "mensaje": "creado con exito" }))
        .catch(e => res.status(400).json({ "mensaje": "error al crear: " + e }))

})


router.get("/", (req, res) => {

    let datos = Categoria.find()

    return datos
        .then(data => res.status(200).json(data))
        .catch(e => res.status(400).json({ "mensaje": "error al traer datos: " + e }))

})

/*
async function crearCategoria(body) {

    let categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion,
        estado: true
    })

    return await categoria.save()
}
    */

module.exports = router