import Router from 'koa-router';
import NoticicationController from '../../controllers/notification';

const router = new Router();

router.post('/username/:username', NoticicationController.findByusername);

export default router;