const graphql = require('graphql');

const MessageType = require('./MessageType');
const UserType = require('./UserType');
const RoomType = require('./RoomType');

const {
  GraphQLObjectType,
  GraphQLList,
} = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    messages: {
      type: GraphQLList(MessageType),
      resolve(parentValue, args, context) {
        return context.models.Messages.getAll();
      },
    },
    users: {
      type: GraphQLList(UserType),
      resolve(parentValue, args, context) {
        return context.models.Users.getAll();
      },
    },
    rooms: {
      type: GraphQLList(RoomType),
      resolve(parentValue, args, context) {
        return context.models.Rooms.getAll();
      },
    },
  },
});

module.exports = RootQueryType;
