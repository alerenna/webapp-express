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
    SELECT reviews.name, reviews.text, reviews.vote, reviews.created_at, movies.title, movies.abstract, movies.director
    FROM reviews
    JOIN movies ON reviews.movie_id = movies.id
    WHERE movie_id = ?`

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

function create(req, res) {
    console.log('Ricevutarichiesta POST con body:', req.body);


    const movie_id = Number(req.params.id)
    const { name, text, vote } = req.body

    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const updated_at = created_at

    const sql = 'INSERT INTO reviews (name, text, vote, movie_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    const sqlValues = [name, text, vote, movie_id, created_at, updated_at]

    connection.query(sql, sqlValues, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query Failed' })

        const newReview = {
            id: results.insertId,
            name,
            text,
            vote,
            created_at,
            updated_at
        }

        res.status(201).json({ message: 'Review added succesfully', newReview })
    })


}

module.exports = {
    index,
    show,
    create
}
