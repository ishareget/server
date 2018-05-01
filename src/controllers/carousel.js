import Carousel from '../models/carousel';

class CarouselControllers {

    async find(ctx) {
        ctx.body = await Carousel.find(ctx);
    }

    async create(ctx) {
        ctx.body = await Carousel.create(ctx);
    }

    async update(ctx) {
        ctx.body = await Carousel.update(ctx);
    }

    async delete(ctx) {
        ctx.body = await Carousel.delete(ctx);
    }
}

export default new CarouselControllers();