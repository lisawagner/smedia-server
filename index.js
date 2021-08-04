const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const PORT = process.env.PORT || 5000;

// create server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// connect to database
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // start server
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server Running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
