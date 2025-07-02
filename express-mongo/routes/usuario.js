const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const secret = process.env.SECRET

const r = express.Router()

const Usuario = require("../models/usuarioModel")

r.post("/register", (req, res) => {

    let body = req.body
    let user = new Usuario({
        username: body.username,
        password: bcrypt.hashSync(body.password, 10)
    })

    return user.save()
        .then(res.status(201).json({ "mensaje": "usuario registrado con exito" }))
        .catch(e => res.status(400).json({ "mensaje": "error al registrarse: " + e }))
})

r.post("/login", (req, res) => {

    let body = req.body

    Usuario.findOne({
        username: body.username
    })
        .then(data => {
            const pass = bcrypt.compareSync(body.password, data.password)
            if (!pass) {
                return res.status(400).json({ "mensaje": "error en las credenciales" })
            }
            const token = jwt.sign({ _id: data._id, username: data.username },
                secret, {
                expiresIn: 120 * 60
            })
            res.status(200).json({ "username": data.username, "token": token })
        })
        .catch(err => res.status(400).json({ "mensaje": err }))
})

module.exports = r