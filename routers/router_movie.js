const express = require('express')
const router = express.Router()
const moviesController = require('../controllers/controller_movie')

//Index
router.get('/', moviesController.index)

//Show
router.get('/:id', moviesController.show)

module.exports = router