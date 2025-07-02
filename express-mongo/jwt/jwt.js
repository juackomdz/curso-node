const jwt = require("jsonwebtoken")

const secret = process.env.SECRET

let verificaToken = (req, res, next) => {

    let token = req.get("Authorization")
    let split = token.split(" ")[1]
    jwt.verify(split, secret, (err) => {
        if (err) {
            return res.status(401).json({ "mensaje": err })
        }
        next()
    })
}

module.exports = verificaToken