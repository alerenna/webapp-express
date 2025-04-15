const connection = require('../data/db')

function index(req, res) {
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query Failed' })

        console.log(results);
        res.json(results)
    })
}

function show(req, res) {
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
}

module.exports = {
    index,
    show
}

