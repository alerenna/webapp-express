const serverError = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        error: 500,
        message: 'Internal Server Error'
    })
}

module.exports = serverError