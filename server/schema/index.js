const graphql = require('graphql');

const RootQueryType = require('./types/RootQueryType');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
