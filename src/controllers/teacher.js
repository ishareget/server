import Teacher from '../models/teacher';

class TeacherControllers {

    async find(ctx) {
        ctx.body = await Teacher.find(ctx);
    }
}

export default new TeacherControllers()