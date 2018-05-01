import Participate from '../models/participate'

class ParticipateControllers {

    async findByMission(ctx) {
        ctx.body = await Participate.findByMission(ctx);
    }

    async findByStatus(ctx) {
        ctx.body = await Participate.findByStatus(ctx);
    }

    async findByStudent(ctx) {
        ctx.body = await Participate.findByStudent(ctx);
    }

    async create(ctx) {
        ctx.body = await Participate.create(ctx);
    }

    async update(ctx) {
        ctx.body = await Participate.update(ctx);
    }

    async delete(ctx) {
        ctx.body = await Participate.delete(ctx);
    }

}

export default new ParticipateControllers();