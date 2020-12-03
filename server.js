const express = require('express');

const userRouter = require('./users/userRouter')

const server = express();

server.use(express.json()); // the req now has a body object
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// LOGGER
const logger = (req, res, next) => {
  const d = new Date();
  console.log(`${req.method} ${req.url} ${d.toUTCString()}`)
  res.status(200).json({ message: 'logger is working'})
  next()
};

server.use('/api/users', userRouter)

module.exports = server;
