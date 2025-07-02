const express = require("express")
const router = express.Router()

const Categoria = require("../models/categoriaModel")

const verify = require("../jwt/jwt")


router.post("/", verify, (req, res) => {
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


router.get("/", verify, (req, res) => {

    let datos = Categoria.find({ estado: true }).select({ estado: 0 })

    return datos
        .then(data => res.status(200).json(data))
        .catch(e => res.status(400).json({ "mensaje": "error al traer datos: " + e }))

})

router.get("/:id", verify, (req, res) => {

    let id = req.params.id
    let categoria = Categoria.findById(id).select({ estado: 0 })


    return categoria
        .then(data => {
            if (data === null) {
                res.status(400).json({ "mensaje": "la categoria no existe" })
                return
            }
            res.status(200).json(data)
        })
        .catch(e => res.status(400).json({ "mensaje": "error al traer datos: " + e }))
})

router.put("/:id", verify, (req, res) => {

    let id = req.params.id
    let body = req.body

    let datos = Categoria.findByIdAndUpdate(id, {
        $set: {
            nombre: body.nombre,
            descripcion: body.descripcion
        }
    })

    return datos
        .then(res.status(200).json({ "mensaje": "datos actualizados con exito" }))
        .catch(e => res.status(400).json({ "mensaje": "error al actualizar" }))
})



///---------------eliminado fisico
/*
router.delete("/:id", (req, res) => {

    let id = req.params.id

    let datos = Categoria.deleteOne({ _id: id })

    return datos
        .then(res.status(200).json({ "mensaje": "datos eliminado con exito" }))
        .catch(e => res.status(400).json({ "mensaje": "error al eliminar: " + e }))
})
*/
///--------------eliminado logico

router.delete("/:id", verify, (req, res) => {

    let id = req.params.id

    let datos = Categoria.findOneAndUpdate({ _id: id }, { estado: false })

    return datos
        .then(res.status(200).json({ "mensaje": "datos eliminado con exito" }))
        .catch(e => res.status(400).json({ "mensaje": "error al eliminar: " + e }))
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