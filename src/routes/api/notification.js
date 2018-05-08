import Router from 'koa-router';
import NoticicationController from '../../controllers/notification';

const router = new Router();

router.post('/username', NoticicationController.findByusername);
router.post('/create', NoticicationController.create);
router.post('/update', NoticicationController.update);

export default router;