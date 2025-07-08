import { Router } from "express"
import { PrismaClient } from "../generated/prisma/client.js"

const router = Router()
const prisma = new PrismaClient()

router.post("/", async (req, res) => {
    const category = await prisma.categoria.create({
        data: {
            nombre: req.body.nombre
        }
    })

    res.status(200).json(category)

})

router.get("/", (req, res) => {
    prisma.categoria.findMany()
        .then(data => res.send(data))
        .catch(e => res.send(e))
})

router.get("/:id", (req, res) => {
    let idP = parseInt(req.params.id)

    prisma.categoria.findUnique({
        where: {
            id: idP
        }
    })
        .then(data => res.status(200).json(data))
        .catch(e => res.status(400).json(e))
})

router.put("/:id", (req, res) => {

    let id = parseInt(req.params.id)

    prisma.categoria.update({
        where: {
            id: id
        },
        data: {
            nombre: req.body.nombre
        }
    })
        .then(res.status(200).json({ mensaje: "actualizado con exito" }))
        .catch(e => res.status(400).json(e))
})

router.delete("/:id", (req, res) => {

    let id = parseInt(req.params.id)

    prisma.categoria.delete({
        where: {
            id: id
        }
    })
        .then(res.status(200).json({ mensaje: "eliminado con exito" }))
        .catch(e => res.status(400).json(e))

})

export default router
