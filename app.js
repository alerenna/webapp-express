const express = require('express')
const app = express()
const port = 3005
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


//Router movies
app.use('/api/v1/movies', routerMovies)


// Middleware errors
app.use(error_404)
app.use(serverError)
