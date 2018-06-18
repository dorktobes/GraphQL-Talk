require('dotenv').config();
const express = require('express');
const path = require('path');
const expressGraphQL = require('express-graphql');

const app = express();
const models = require('../db/models');
const bodyparser = require('body-parser');
const schema = require('./schema');

app.use(bodyparser.json());

app.use((req, res, next) => {
  console.log(`serving request ${req.method} at ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '../client/dist/')));

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
  context: {
    models,
  },
}));

app.get('/users/name/:username', (req, res) => {
  models.Users.getByUsername(req.params.username)
    .then((data) => {
      console.log(data);
      res.send(data || {});
    })
    .catch((err) => {
      res.status(503);
      res.send(err);
    });
});

app.get('/users/:userid', (req, res) => {
  models.Users.getByID(req.params.userid)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(503);
      res.send(err);
    });
});

app.post('/users', (req, res) => {
  models.Users.create(req.body.username)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(503);
      res.send(err);
    });
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
    });
});

app.get('/messages', (req, res) => {
  models.Messages.getAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(503);
      res.send(err);
    });
});
app.post('/messages', (req, res) => {
  models.Messages.create(req.body);
  res.status(201);
  res.send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
