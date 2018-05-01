import Router from 'koa-router';
import LogControllers from '../../controllers/log';
import roles from '../../middleware/roles';

const router = new Router();

router.get('/', roles, LogControllers.find);
router.get('/clean', roles, LogControllers.clean);

export default router;