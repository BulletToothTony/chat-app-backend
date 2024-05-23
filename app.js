const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const port = 3000

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const usersRoutes = require('./routes/users-routes');
const chatRoutes = require('./routes/chat-routes');

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");
  next();
});


// app.get('/', (req, res) => {
//   res.json('Hello World!')
// })

app.use('/api/users', usersRoutes)
app.use('/api/chats', chatRoutes)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

mongoose.connect(`${process.env.DB_URI}`).then(() => {
    app.listen(3000, () => {
        console.log('Example app listening on 3000')
    })
})