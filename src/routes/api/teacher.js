import Router from 'koa-router';
import TeacherControllers from '../../controllers/teacher';
import roles from '../../middleware/roles';

const router = new Router();

router.get('/', roles, TeacherControllers.find); // dashboard老師表

export default router;