const express = require('express')
const app = express()
const port = 3005
const cors = require('cors')
const routerMovies = require('./routers/router_movie')
const error_404 = require('./middlewares/error_404')
const serverError = require('./middlewares/serverError')

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})

app.get('/', (req, res) => {
    console.log(`That's the movie server`);
    res.send('MOvie API server!')
})

//Middleware cors
app.use(cors({
    origin: 'http://localhost:5173'
}))

//Middleware static public
app.use(express.static('public'))

//Middleware per parsing del body
app.use(express.json())

//Router movies
app.use('/api/v1/movies', routerMovies)

// Middleware errors
app.use(error_404)
app.use(serverError)
