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
    Messages: {
      type: GraphQLList(MessageType),
      resolve(parentValue, args, context) {
        return context.models.Messages.getAll();
      },
    },
    Users: {
      type: GraphQLList(UserType),
      resolve(parentValue, args, context) {
        return context.models.Users.getAll();
      },
    },
    Rooms: {
      type: GraphQLList(RoomType),
      resolve(parentValue, args, context) {
        return context.models.Rooms.getAll();
      },
    },
  },
});

module.exports = RootQueryType;
