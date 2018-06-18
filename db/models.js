const { Message, User, Room } = require('./index.js');

const Users = {
  getAll: () => {
    return User.find({});
  },
  getByID: (id) => {
      return User.findById(id);
  },
  getByUsername: (username) => {
    return User.findOne({ username });
  },
  create: (username) => {
    return new Promise((resolve, reject) => {
      User.find({ username })
      .then((result) => {
        if(result.length){
          resolve(result[0]);
        } else {
          const newUser = new User({ username });
          newUser.save()
          .then((data) => {
            resolve(data);
          })
        }
      })
    });
  },
};

const Rooms = {
  getAll: () => {
    return Room.find({});
  },
  getById: (id) => {
    return Room.findById(id);
  },
  create: (name) => {
    return new Promise((resolve, reject) => {
      Room.find({ name })
      .then((result) => {
        if(result.length){
          resolve(result[0]);
        } else {
          const newRoom = new Room({ name });
          newRoom.save()
          .then((data) => {
            resolve(data);
          })
        }
      })
    });
  },
};

const Messages = {
  getAll: () => {
    return Message.find({});
  },
  create: (message) => {
    console.log('message', message);
    const newMessage = new Message(message)
    return newMessage.save();
  },
  getAllForUser: (username) => {},
  getAllForRoom: (roomName) => {},
};

module.exports = {
  Users,
  Rooms,
  Messages,
};
