import Router from 'koa-router';
import ParticipateControllers from '../../controllers/participate';
import roles from '../../middleware/roles';

const router = new Router();

router.get('/missionexp', roles, ParticipateControllers.findByMission); // 取得使用者任務包含任務資訊
router.get('/status', roles, ParticipateControllers.findByStatus); // 任務列表的待審核、轉退回、已審核頁面
router.get('/homepage/:uid', roles, ParticipateControllers.findByStudent); // 學生的user頁面
router.post('/create', roles, ParticipateControllers.create);
router.post('/update', roles, ParticipateControllers.update);
router.post('/delete', roles, ParticipateControllers.delete);

export default router;