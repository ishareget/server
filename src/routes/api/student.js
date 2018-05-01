import Router from 'koa-router';
import StudentControllers from '../../controllers/student';
import roles from '../../middleware/roles';

const router = new Router();

router.get('/', roles, StudentControllers.find); // dashboard學童表

export default router;