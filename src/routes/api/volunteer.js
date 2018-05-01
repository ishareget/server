import Router from 'koa-router';
import VolunteerControllers from '../../controllers/volunteer';
import roles from '../../middleware/roles';

const router = new Router();

router.get('/', roles, VolunteerControllers.find); // dashboard志工表

export default router;