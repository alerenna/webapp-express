const express = require('express')
const app = express()
const port = 3005
const error_404 = require('./middlewares/error_404')
const serverError = require('./middlewares/serverError')
//Move connection to controllers
const connection = require('./data/db')

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})

app.get('/', (req, res) => {
    console.log(`That's the movie server`);
    res.send('MOvie API server!')
})


//Index
app.get('/api/v1/movies', (req, res) => {

    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query Failed' })

        console.log(results);
        res.json(results)
    })
})

//Show
app.get('/api/v1/movies/:id', (req, res) => {

    const id = Number(req.params.id)

    const sqlMovies = 'SELECT * FROM movies WHERE id = ?'
    const sqlReviews = `
    SELECT reviews.name, reviews.text
    FROM reviews
    JOIN movies ON reviews.movie_id = movies.id`

    connection.query(sqlMovies, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Query Failed' })
        if (movieResults === 0) return res.status(404).json({ error: 'Movie not found' })

        const movie = movieResults[0]

        connection.query(sqlReviews, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ error: 'Query Failed' })
            if (reviewResults === 0) return res.status(404).json({ error: 'Movie not found' })

            movie.review = reviewResults

            res.json(movie)
        })


    })
})


// Middleware errors
app.use(error_404)
app.use(serverError)
