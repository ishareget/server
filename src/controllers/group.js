import Group from '../models/group';

class GroupControllers {

    async find(ctx) {
        ctx.body = await Group.find(ctx);
    }

    async findById(ctx) {
        ctx.body = await Group.findById(ctx);
    }
}

export default new GroupControllers();