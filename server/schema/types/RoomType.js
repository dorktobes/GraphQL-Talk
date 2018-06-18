const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const RoomType = new GraphQLObjectType({
  name: 'RoomType',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(parentValue) {
        return parentValue._id;
      },
    },
    name: {
      type: GraphQLString,
    },
  }),
});

module.exports = RoomType;
