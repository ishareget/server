import Notification from '../models/notification';

class NotificationController {
    async findByusername(ctx) {
        ctx.body = await Notification.findByusername(ctx);
    }
}

export default new NotificationController();