import { readFile } from 'fs';
import { promisify } from 'util';

const server = require('server');
const debug = require('debug')('serve-json');

const readFileP = promisify(readFile);
const { json } = server.reply;
const dir = process.argv[2] || process.env.PWD;

debug('Serving files under', dir, process.argv);

server({ port: 8080, security: false }, async (ctx: any) => renderFile(ctx.path, ctx.method));

async function renderFile(path: string, method: string): Promise<String> {
  try {
    const filePath = `${dir}${path}.${method}.json`;
    const data = await readLines(filePath);
    debug(method, path, '200 OK');
    return json(data);
  } catch (e) {
    debug(method, path, '404 Not found');
    return server.reply.status(404).json({ type: 'error', message: 'File not found' });
  }
}

async function readLines<T>(path: string): Promise<T> {
  return JSON.parse((await readFileP(path)).toString()) as T;
}
