import Router from 'koa-router';
import CarouselControllers from '../../controllers/carousel';
import roles from '../../middleware/roles';

const router = new Router();

router.get('/', CarouselControllers.find);
router.post('/create', roles, CarouselControllers.create);
router.post('/update', roles, CarouselControllers.update);
router.post('/delete', roles, CarouselControllers.delete);

export default router;