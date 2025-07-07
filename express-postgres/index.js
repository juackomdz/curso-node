import express from "express"
import categoria from "./routes/categoria.js"
import producto from "./routes/producto.js"

const app = express()

app.use(express.json())
app.use("/api/categoria", categoria)
app.use("/api/producto", producto)

app.listen(3000, () => {
    console.log("corriendo en puerto 3000")
})