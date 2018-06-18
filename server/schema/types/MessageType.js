const graphql = require('graphql');
const UserType = require('./UserType');
const RoomType = require('./RoomType');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const MessageType = {};

module.exports = MessageType;
