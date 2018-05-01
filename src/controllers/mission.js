import Mission from '../models/mission'

class MissionControllers {

    async find(ctx) {
        ctx.body = await Mission.find(ctx);
    }

    async findById(ctx) {
        ctx.body = await Mission.findById(ctx);
    }

    async findByGroup(ctx) {
        ctx.body = await Mission.findByGroup(ctx);
    }

    async findByUser(ctx) {
        ctx.body = await Mission.findByUser(ctx);
    }

    async findType(ctx) {
        ctx.body = await Mission.findType(ctx);
    }

    async create(ctx) {
        ctx.body = await Mission.create(ctx);
    }

    async update(ctx) {
        ctx.body = await Mission.update(ctx);
    }

    async delete(ctx) {
        ctx.body = await Mission.delete(ctx);
    }

    async verify(ctx) {
        ctx.body = await Mission.verify(ctx);
    }

    async give(ctx) {
        ctx.body = await Mission.give(ctx);
    }

    async signature(ctx) {
        ctx.body = await Mission.signature(ctx);
    }

    async punchin(ctx) {
        ctx.body = await Mission.punchin(ctx);
    }
}

export default new MissionControllers();