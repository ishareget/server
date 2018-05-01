import User from '../models/user';

class UserControllers {

    async login(ctx) {
        ctx.body = await User.login(ctx);
    }

    async userinfo(ctx) {
        ctx.body = await User.userinfo(ctx);
    }

    async permission(ctx) {
        ctx.body = await User.permission(ctx);
    }

    async create(ctx) {
        ctx.body = await User.create(ctx);
    }

    async update(ctx) {
        ctx.body = await User.update(ctx);
    }

    async delete(ctx) {
        ctx.body = await User.delete(ctx);
    }
}

export default new UserControllers();