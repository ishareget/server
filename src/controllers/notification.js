import Notification from '../models/notification';

class NotificationController {
    async findByusername(ctx) {
        ctx.body = await Notification.findByusername(ctx);
    }

    async create(ctx) {
        ctx.body = await Notification.create(ctx);
    }

    async update(ctx) {
        ctx.body = await Notification.update(ctx);
    }
}

export default new NotificationController();