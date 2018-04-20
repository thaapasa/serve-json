const server = require('server');
const debug = require('debug')('serve-json');

const { get, post } = server.router;

debug('Starting server...');

server({ port: 8080, security: false }, (ctx: any) => 'Hello any!');
