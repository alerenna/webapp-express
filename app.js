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

app.get('/api/v1/movies', (req, res) => {

    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query Failed' })

        console.log(results);
        res.json(results)
    })
})

