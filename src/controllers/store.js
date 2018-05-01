
import Store from '../models/store';

class StoreControllers {

    async find(ctx) {
        ctx.body = await Store.find(ctx);
    }

    async findById(ctx) {
        ctx.body = await Store.findById(ctx);
    }

    async add(ctx) {
        ctx.body = await Store.add(ctx);
    }

    async update(ctx) {
        ctx.body = await Store.update(ctx);
    }

    async delete(ctx) {
        ctx.body = await Store.delete(ctx);
    }
}

export default new StoreControllers()