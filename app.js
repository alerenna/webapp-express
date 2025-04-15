const express = require('express')
const app = express()
const port = 3005


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})

app.get('/', (req, res) => {
    console.log(`That's the movie server`);
})