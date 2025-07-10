import { Router } from "express"
import { PrismaClient } from "../generated/prisma/client.js"

const router = Router()
const prisma = new PrismaClient()

router.post("/", (req, res) => {

    let body = req.body
    prisma.producto.create({
        data: {
            nombre: body.nombre,
            precio: body.precio,
            stock: body.stock,
            categoria_id: body.categoria_id
        }
    })
        .then(res.status(201).json({ mensaje: "creado con exito" }))
        .catch(e => res.status(400).json({ mensaje: e }))
})

router.get("/", async (req, res) => {
    const products = await prisma.producto.findMany({
        include: {
            categoria: true
        }
    })

    res.status(200).json(products)
})

router.get("/:id", (req, res) => {
    let id = parseInt(req.params.id)

    prisma.producto.findFirst({
        where: {
            id: id
        },
        include: {
            categoria: true
        }
    })
        .then(data => {
            if (data === null) {
                res.status(404).json({ mensaje: "producto no encontrado" })
                return
            }
            res.status(200).json(data)
        })
        .catch(e => res.status(400).json(e))
})

router.put("/:id", (req, res) => {
    let id = parseInt(req.params.id)

    prisma.producto.update({
        where: {
            id: id
        },
        data: req.body
    })
        .then(data => {
            if (data === null) {
                res.status(404).json({ mensaje: "producto no encontrado" })
                return
            }
            res.status(200).json({ mensaje: "producto actualizado correctamente" })
        })
        .catch(e => res.status(400).json(e))
})

router.delete("/:id", async (req, res) => {

    let id = parseInt(req.params.id)

    const product = await prisma.producto.findFirst({
        where: {
            id: id
        }
    })

    if (product === null) {
        res.status(404).json({ mensaje: "producto no encontrado" })
        return
    } else {

        prisma.producto.delete({
            where: {
                id: id
            }
        })
            .then(res.status(200).json({ mensaje: "producto eliminado con exito" }))
            .catch(e => res.status(400).json(e))
    }
})

export default router