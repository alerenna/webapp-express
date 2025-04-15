const express = require('express')
const app = express()
const port = 3005
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

    const sql = 'SELECT * FROM movies WHERE id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Query Failed' })
        if (results === 0) return res.status(404).json({ error: 'Movie not found' })

        const movie = results[0]

        res.json(movie)
    })
})

