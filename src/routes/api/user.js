import Router from 'koa-router';
import UserControllers from '../../controllers/user';
import roles from '../../middleware/roles';

const router = new Router();

router.post('/login', UserControllers.login);
router.get('/userinfo', UserControllers.userinfo);
router.get('/permission/:uid', UserControllers.permission);
router.post('/create', roles, UserControllers.create);
router.post('/update', roles, UserControllers.update);
router.post('/delete', roles, UserControllers.delete);

export default router;