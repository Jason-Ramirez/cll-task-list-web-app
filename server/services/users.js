const { ApolloServer } = require('apollo-server');
const { applyMiddleware } = require("graphql-middleware");
const { buildSubgraphSchema } = require('@apollo/federation');
const { typeDefs, resolvers } = require('../schema');
const { permissions } = require('./permissions');

const server = new ApolloServer({
  schema: applyMiddleware(
    buildSubgraphSchema([{ typeDefs, resolvers }]),
    permissions
  ),
  context: ({ req }) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { user };
  }
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Service ready at ${url}`);
});