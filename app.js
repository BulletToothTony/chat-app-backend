const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const usersRoutes = require('./routes/users-routes');
const chatRoutes = require('./routes/chat-routes');



app.use(cors({
  origin: 'https://chat-me-7fz3.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

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

// app.use(cors())


// app.get('/', (req, res) => {
//   res.json('Hello World!')
// })

app.get('/api/hello', (req, res) => {
  res.send('Hello World!');
});

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