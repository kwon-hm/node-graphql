const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("./log/winston");
const log = (msg) => logger.info(msg);

/**
 *   dev
 */
const config = require("./config/dev.json");

const {ApolloServer} = require("apollo-server-express");
const typeDefs = require("./gql/gql_schemas");
const resolvers = require("./gql/resolvers");

const apollo = new ApolloServer({
    typeDefs, 
    resolvers, 
    introspection: true, 
    playground: true
});

apollo.applyMiddleware({
    app
});

// const server = require("http").createServer(app);
const serverPort = config.server.port;

app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({extended: true }));


app.listen(serverPort, "0.0.0.0",() => {
    console.log("Server listenling <"+ config.environment +"> on port " + serverPort);
    log("Server listenling <"+ config.environment +"> on port " + serverPort);
});

app.on("error", (err) => {
    console.log("server.on Error", err);
    throw err;
})

process.on("uncaughtException", (err) => {
    console.log("Process.on Error ", err);
    throw err;
})