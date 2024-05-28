const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const usersRoutes = require('./routes/users-routes');
const chatRoutes = require('./routes/chat-routes');

const app = express();
const port = process.env.PORT || 3000;

// Allow requests from your frontend origin
const allowedOrigins = ['https://chatme-frontend-vert.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/users', usersRoutes);
app.use('/api/chats', chatRoutes);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

// General error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
