import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'dist');
http.createServer(async(req,res)=>{
 try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}const bytes=await fs.readFile(file);res.writeHead(200,{'Content-Type':({'.html':'text/html','.css':'text/css','.mjs':'text/javascript'})[path.extname(file)]||'application/octet-stream'});res.end(bytes);}catch{res.writeHead(404);res.end('Not found');}
}).listen(4173,'127.0.0.1',()=>console.log('Planner preview: http://127.0.0.1:4173'));
