const { Message, User, Room } = require('./index.js');

const Users = {
  getAll: () => User.find({}),
  getByID: id => User.findById(id),
  getByUsername: username => User.findOne({ username }),
  create: username => Promise((resolve) => {
    User.find({ username })
      .then((result) => {
        if (result.length) {
          resolve(result[0]);
        } else {
          const newUser = new User({ username });
          newUser.save()
            .then((data) => {
              resolve(data);
            });
        }
      });
  }),
};

const Rooms = {
  getAll: () => Room.find({}),
  getById: id => Room.findById(id),
  create: name => new Promise((resolve) => {
    Room.find({ name })
      .then((result) => {
        if (result.length) {
          resolve(result[0]);
        } else {
          const newRoom = new Room({ name });
          newRoom.save()
            .then((data) => {
              resolve(data);
            });
        }
      });
  }),
};

const Messages = {
  getAll: () => Message.find({}),
  getAllForUser: userId => Message.find({ user: userId }),
  getAllForRoom: roomId => Message.find({ room: roomId }),
  create: (message) => {
    const newMessage = new Message(message);
    return newMessage.save();
  },
};

module.exports = {
  Users,
  Rooms,
  Messages,
};
