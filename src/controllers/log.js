import Log from '../models/log'

class LogControllers {

    async find(ctx) {
        ctx.body = await Log.find(ctx);
    }
    async clean(ctx) {
        ctx.body = await Log.clean(ctx);
    }
}

export default new LogControllers();