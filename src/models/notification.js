import mysql from 'mysql2/promise';
import config from '../config/db';

class Notification {

    async findByusername(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [row, field] = await connection.query('Select * from notification Where username = ? DESC noti_time', [ctx.query.username]);
            connection.close();
            if (row.length === 0) {
                return false;
            }
            return row;
        } catch (e) {
            return false;
        }
    }

}

export default new Notification();