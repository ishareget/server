import Router from 'koa-router';
import UploadControllers from '../../controllers/upload';
import roles from '../../middleware/roles';

const router = new Router();

router.post('/participate', UploadControllers.participate);
router.post('/mission', UploadControllers.mission);
router.post('/carousel', UploadControllers.carousel);
router.post('/profile', UploadControllers.profile);
export default router;