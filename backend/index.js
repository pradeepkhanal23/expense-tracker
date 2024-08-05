// core node modules
const express = require("express");
const path = require("path");

// dotenv package for env file
require("dotenv").config();

// imported apollo related contents including the server and the middleware
const { typeDefs, resolvers } = require("./schemas");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");

//connection file for mongoDB/database connection
const connectDB = require("./config/connection");

// initializing app
const app = express();
const PORT = process.env.PORT || 8000;

// configuring the server with type defs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//starting the server on starr
const startApolloServer = async () => {
  await server.start();

  //making sure that our server is able to parse JSON file and url encoded form datas
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // contrary to traditional RESTApi sever, where we create a routes folder and pass it onto the middleware, we are using a single endpoint "graphql" and passing it to the express middleware which has a graphql server implementation (this is special express server imported from apollo to support graphql)
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    //serving the index.html file on other route except "/graphql"
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
  }
};

// Connecting to MongoDB and then starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Now listening on localhost:${PORT}`);
  });
});

// calling the async function to start the server
startApolloServer();
