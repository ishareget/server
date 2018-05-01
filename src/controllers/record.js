import Record from '../models/record';

class RecordControllers {

    async find(ctx) {
        ctx.body = await Record.find(ctx);
    }

    async create(ctx) {
        ctx.body = await Record.create(ctx);
    }
}

export default new RecordControllers();