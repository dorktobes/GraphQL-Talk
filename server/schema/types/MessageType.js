const graphql = require('graphql');
const UserType = require('./UserType');
const RoomType = require('./RoomType');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const MessageType = new GraphQLObjectType({
  name: 'MessageType',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(parentValue) {
        return parentValue._id;
      },
    },
    text: {
      type: GraphQLString,
    },
    user: {
      type: UserType,
      resolve({ user }, args, context) {
        return context.models.Users.getByID(user);
      },
    },
    room: {
      type: RoomType,
      resolve({ room }, args, context) {
        return context.models.Rooms.getById(room);
      },
    },
  }),
});

module.exports = MessageType;
