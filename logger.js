function log(req, res, next) {
    console.log("logeandose...")
    next()
}

module.exports = log