import Volunteer from '../models/volunteer';

class VolunteerControllers {

    async find(ctx) {
        ctx.body = await Volunteer.find(ctx);
    }
}

export default new VolunteerControllers();