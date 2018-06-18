require('dotenv').config();
const models = require('./models');
const users = ['dorktobes', 'fredzirdung', 'mracus', 'seldo', 'leeb', 'danabramov'];
const rooms = ['lobby', 'random', 'chatter', 'GraphQL'];

users.forEach((username) => {
  models.Users.create(username);
});

rooms.forEach((name) => {
  models.Rooms.create(name);
})
