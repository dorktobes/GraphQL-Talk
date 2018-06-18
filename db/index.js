const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', (err) => {
  console.error(err);
})
db.on('connect', console.log.bind(console, 'Connected to DB'));

const roomSchema = mongoose.Schema({
  name: String,
});

const Room = mongoose.model('Room', roomSchema);

const userSchema = mongoose.Schema({
  username: String,
})

const User = mongoose.model('User', userSchema);

const messageSchema = mongoose.Schema({
  text: String,
  user: String,
  room: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = {
  User,
  Room,
  Message,
};
