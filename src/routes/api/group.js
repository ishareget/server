import Router from 'koa-router';
import GroupControllers from '../../controllers/group';
import roles from '../../middleware/roles';

const router = new Router();

router.get('/', roles, GroupControllers.find);
router.get('/id/:uid', roles, GroupControllers.findById);

export default router;