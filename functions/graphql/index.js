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
  introspection: true,
});

exports.handler = server.createHandler();
