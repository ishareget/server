import Student from '../models/student';

class StudentControllers {

    async find(ctx) {
        ctx.body = await Student.find(ctx);
    }
}

export default new StudentControllers();