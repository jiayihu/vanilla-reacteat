const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(__dirname + '/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => setTimeout(next, 300));
server.use(jsonServer.bodyParser);
server.use(router);

if (process.env.NODE_ENV !== 'production') {
  server.listen(3001, () => {
    console.log('JSON Server is running');
  });
}

exports.api = server;
