const express = require("express")
const router = express.Router()

const Producto = require("../models/productoModel")

const verify = require("../jwt/jwt")


router.post("/", verify, (req, res) => {

    let body = req.body
    let producto = new Producto({
        nombre: body.nombre,
        precio: body.precio,
        descripcion: body.descripcion,
        estado: true,
        categoria: body.categoria
    })


    return producto.save()
        .then(res.status(201).json({ "mensaje": "creado con exito" }))
        .catch(e => res.status(400).json({ "mensaje": "error al crear: " + e }))
})

router.get("/", verify, (req, res) => {

    let datos = Producto.find({ estado: true }).populate("categoria", "-estado").select({ estado: 0 }).exec()

    return datos
        .then(data => res.status(200).json(data))
        .catch(e => res.status(400).json({ "mensaje": "error al traer datos: " + e }))
})

router.get("/:id", verify, (req, res) => {

    let id = req.params.id
    let datos = Producto.findOne({ estado: true, _id: id }).populate("categoria", "-estado").select({ estado: 0 }).exec()

    return datos
        .then(data => {
            if (data === null) {
                res.status(404).json({ "mensaje": "no hay datos" })
                return
            }
            res.status(200).json(data)
        })
        .catch(e => res.status(400).json({ "mensaje": "error al traer datos: " + e }))


})

router.delete("/:id", verify, (req, res) => {
    let id = req.params.id

    let datos = Producto.findOneAndUpdate({ _id: id }, { estado: false })

    return datos
        .then(res.status(200).json({ "mensaje": "elemento eliminado con exito" }))
        .catch(e => res.status(400).json({ "mensaje": "error al traer datos: " + e }))
})

router.put("/:id", verify, (req, res) => {

    let id = req.params.id

    let body = req.body

    let datos = Producto.findByIdAndUpdate(id, {
        $set: {
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            categoria: body.categoria
        }
    })

    return datos
        .then(res.status(200).json({ "mensaje": "datos actualizados con exito" }))
        .catch(e => res.status(400).json({ "mensaje": "error al actualizar" }))
})

module.exports = router