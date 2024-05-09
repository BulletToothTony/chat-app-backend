const express = require('express')
const app = express()
const port = 3000

const bodyParser = require("body-parser");

const usersRoutes = require('./routes/users-routes');

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json('Hello World!')
})

app.use('/api/users', usersRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})