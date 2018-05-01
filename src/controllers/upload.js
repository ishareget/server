import Upload from '../models/upload';

class UploadControllers {

    async participate(ctx) {
        ctx.body = await Upload.participate(ctx);
    }

    async mission(ctx) {
        ctx.body = await Upload.mission(ctx);
    }

    async carousel(ctx) {
        ctx.body = await Upload.carousel(ctx);
    }

    async profile(ctx) {
        ctx.body = await Upload.profile(ctx);
    }
}

export default new UploadControllers();