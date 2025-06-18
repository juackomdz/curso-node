const express = require("express")
require("dotenv").config()
const joi = require("joi")
const log = require("./logger")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(log)

const users = [{
    "id": 1,
    "nombre": "juan",
    "correo": "juan@correo.cl"
}, {
    "id": 2,
    "nombre": "pedro",
    "correo": "pedro@correo.cl"
}, {
    "id": 3,
    "nombre": "joaquin",
    "correo": "joaquin@correo.cl"
}]


app.get("/", (_, res) => {

    res.send({ "mensaje": "metodo get" })
})

app.get("/usuarios/:id", (req, res) => {

    let usuario = existeUser(req.params.id)

    if (usuario != null) {
        res.status(200).json(usuario)
    } else {
        res.status(404).json({ "mensaje": "usuario no encontrado" })
    }

})

app.get("/usuarios", (req, res) => {

    res.status(200).json(users)
})

app.get("/:id", (req, res) => {

    let id = req.params.id
    res.send({ "mensaje": "metodo get | id= " + id })
})

app.post("/:id/:nombre", (req, res) => {

    let id = req.params.id
    let nombre = req.params.nombre
    res.send({ "mensaje": "metodo post | id = " + id + "nombre = " + nombre })
})

app.post("/usuarios", (req, res) => {

    const schema = joi.object({
        nombre: joi.string()
            .alphanum()
            .min(3)
            .max(50)
            .required(),

        correo: joi.string()
            .required()
            .email()
    })


    const result = schema.validate({ nombre: req.body.nombre, correo: req.body.correo })

    /*
        if (!req.body.nombre || req.body.nombre.length > 3) {
            res.status(400).json({ "mensaje": "error al ingresar nombre" })
            return
        }
    
        if (!req.body.correo || req.body.correo.length > 3) {
            res.status(400).json({ "mensaje": "error al ingresar correo" })
            return
        }
            */

    if (!result.error) {

        const usuario = {
            id: users.length + 1,
            nombre: result.value.nombre,
            correo: result.value.correo
        }
        users.push(usuario)
        res.status(201).json({ "mensaje": "creado con exito" })
    } else {
        res.status(400).json({ "mensaje": result.error.message })
    }


})

app.put("/", (req, res) => {

    let id = req.query.id
    res.send({ "mensaje": "metodo put | id=" + id })
})

app.put("/usuarios/:id", (req, res) => {

    let id = parseInt(req.params.id)

    let usuario = users.find(u => u.id === id)
    if (!usuario) {

        res.status(404).json({ "mensaje": "usuario no encontrado" })
        return
    }
    const schema = joi.object({
        nombre: joi.string()
            .alphanum()
            .min(3)
            .max(50)
            .required(),

        correo: joi.string()
            .required()
            .email()
    })


    const result = schema.validate({ nombre: req.body.nombre, correo: req.body.correo })

    if (result.error) {

        res.status(400).json({ "mensaje": "error al actualizar" })
        return
    }


    usuario.nombre = req.body.nombre
    usuario.correo = req.body.correo

    res.status(200).json({ "mensaje": "actualizado con exito" })

})

app.delete("/", (req, res) => {

    res.send({ "mensaje": "metodo delete" })
})

app.delete("/usuarios/:id", (req, res) => {

    let usuario = existeUser(req.params.id)
    if (!usuario) {
        res.status(404).json({ "mensaje": "usuario no encontrado" })
    }

    const index = users.indexOf(usuario)
    let usuarios = users.splice(index, 1)

    if (!usuarios) {
        res.status(400).json({ "mensaje": "error al eliminar" })
    } else {
        res.status(200).json({ "mensaje": "eliminado con exito" })
    }


})


app.listen(port, () => {
    console.log("corriendo en puerto", port)
})

function existeUser(id) {

    return users.find(u => u.id === parseInt(id))
}