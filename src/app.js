import Koa from 'koa';
import views from 'koa-views';
import mount from 'koa-mount';
import serve from 'koa-static';
import logger from 'koa-logger';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import koabody from 'koa-body';

import helmet from 'koa-helmet';
import jwt from 'koa-jwt';
import cors from 'kcors';

import open from 'open';
import routes from './routes';
import path from 'path';

const app = new Koa();

app
    .use(logger())
    // .use(bodyParser())
    .use(koabody({
        multipart: true
    }))
    .use(helmet())
    .use(cors())
    .use(mount('/', convert(serve(path.join(__dirname, '/public')))))
    .use(views(path.join(__dirname, '/view/'), {
        extension: 'html'
    }))
    .use(jwt({
        secret: process.env.JWT_SECRET,
        // passthrough: true
    }).unless({
        path: ['/', /^\/api\/mission\/signature\.*/, /^\/activity/, /^\/qrcode/, /^\/dashboard/, '/api/carousel', '/api/user/login', '/api', '/api/mission', '/api/mission/type', /^\/api\/mission\/id\/.*/, /^\/api\/upload\/.*/]
    }))
    .use(routes())

app.listen(
    process.env.PORT,
    () => {
        console.log(`✅  The server is running at http://localhost:${process.env.PORT}/`);
        // open(`http://localhost:${env.ip}/`);
    }
)

export default app;