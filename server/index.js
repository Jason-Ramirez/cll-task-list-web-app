const { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } = require("@apollo/gateway");
const express = require('express');
const { expressjwt } = require("express-jwt");
const http = require('http') ;
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { typeDefs, resolvers } = require('./schema');
const apiV1 = require('./routes/v1/api');
const appConfig = require('./config/app');
const User = require('./models/User');

async function startApolloServer() {
  const app = express();
  // Secure NodeJS API https://hevodata.com/learn/building-a-secure-node-js-rest-api/
  // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-1012913186
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })); 
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors({ origin: [appConfig.frontend_url] }));
  app.use(morgan('combined'));
  app.use(
    expressjwt({
      secret: appConfig.secret,
      algorithms: ["HS256"],
      credentialsRequired: false
    }).unless({ path: ['/api/login', '/api/register', '/api/validateToken', '/'] })
  );
  app.use(
    async function(req, res, next) {
      if (req.auth) {
        const user = await User.getById(req.auth.sub);
        if (user) res.locals.user = user;
      }
      next();
    }
  );
  app.use('/api', apiV1);
  const httpServer = http.createServer(app);
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'users', url: 'http://localhost:4001' }
      ],
    }),
    buildService({ name, url }) {
      return new RemoteGraphQLDataSource({
        url,
        willSendRequest({ request, context }) {
          request.http.headers.set(
            'user',
            context.user ? JSON.stringify(context.user) : null
          );
        }
      });
    }
  });
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: ({ req }) => {
      const user = req.auth || null;
      return { user };
    }
  });
  await server.start();
  server.applyMiddleware({ app, path: '/' });
  await new Promise(resolve => httpServer.listen({ port: appConfig.port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${appConfig.port}`);
}

startApolloServer();