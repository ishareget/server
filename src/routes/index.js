import compose from 'koa-compose';
import Router from 'koa-router';

import api from './api';

import roles from '../middleware/roles';

const router = new Router();

router.use('/api', api.routes(), api.allowedMethods());

export default function routes() {
    return compose([
        router.routes(),
        router.allowedMethods()
    ])
}