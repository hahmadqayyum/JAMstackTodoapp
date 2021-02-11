const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolver = {
  Query: {
    hello: () => "Hello World",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolver,

  playground: true,
  intrspection: true,
});

exports.handler = server.createHandler();
