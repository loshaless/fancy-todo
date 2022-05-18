const errorHandler = (err, req, res) => {

    if (err.name === "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message })
    }
    else {
        res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' })
    }
}

module.exports = errorHandler
