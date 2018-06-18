require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const models = require('../db/models');
const bodyparser = require('body-parser');

app.use(bodyparser.json());

app.use((req, res, next) => {
  console.log(`serving request ${req.method} at ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '../client/dist/')));

app.get('/users/:username', (req, res) => {
  models.Users.getByUsername(req.params.username)
  .then((data) => {
    console.log(data);
    res.send(data || {});
  })
  .catch((err) => {
    res.status(503);
    res.send(err);
  })
});

app.post('/users', (req, res) => {
  models.Users.create(req.body.username)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(503);
    res.send(err);
  })
});

app.get('/rooms', (req, res) => {
  models.Rooms.getAll()
  .then((rooms) => {
    console.log(rooms);
    res.send(rooms);
  })
  .catch((err) => {
    res.status(503);
    res.send(err);
  })
});

app.get('/messages', (req, res) => {
  models.Messages.getAll()
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(503);
    res.send(err);
  })
});
app.post('/messages', (req, res) => {
  models.Messages.create(req.body.message)
  res.status(201);

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
  console.log(`Listening on port ${PORT}`);
});
