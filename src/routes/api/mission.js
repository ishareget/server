import Router from 'koa-router';
import MissionControllers from '../../controllers/mission';
import roles from '../../middleware/roles';

const router = new Router();

router.get('/', MissionControllers.find);
router.get('/id/:uid', MissionControllers.findById);
router.get('/group/:uid', MissionControllers.findByGroup);
router.get('/user/:uid', MissionControllers.findByUser);
router.get('/type', MissionControllers.findType);
router.get('/signature/:uid', MissionControllers.signature);
router.post('/punchin', MissionControllers.punchin);
router.post('/create', roles, MissionControllers.create);
router.post('/update', roles, MissionControllers.update);
router.post('/delete', roles, MissionControllers.delete);
router.post('/verify', roles, MissionControllers.verify);
router.post('/give', roles, MissionControllers.give);

export default router;