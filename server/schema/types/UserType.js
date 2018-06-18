const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve(parentValue) {
        return parentValue._id;
      },
    },
    username: {
      type: GraphQLString,
    },
  }),
});

module.exports = UserType;
