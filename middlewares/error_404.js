const notFound = (req, res, next) => {

    res.status(404).json({
        error: 404,
        message: 'Page not found'
    })
}

module.exports = notFound