import Router from 'koa-router';
import RecordControllers from '../../controllers/record';
import roles from '../../middleware/roles';

const router = new Router();

router.get('/', roles, RecordControllers.find);
router.post('/create', roles, RecordControllers.create);

export default router;