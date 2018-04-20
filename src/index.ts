const server = require('server');
const debug = require('debug')('serve-json');

const { json } = server.reply;
const dir = process.argv[2] || process.env.PWD;

debug('Serving files under', dir, process.argv);

server({ port: 8080, security: false }, (ctx: any) => renderFile(ctx.path, ctx.method));

function renderFile(path: string, method: string): Promise<any> {
  try {
    const filePath = `${dir}${path}.${method}.json`;
    const data = require(filePath);
    debug(method, path, '200 OK');
    return json(data);
  } catch (e) {
    debug(method, path, '404 Not found');
    return server.reply.status(404).json({ type: 'error', message: 'File not found' });
  }
}
