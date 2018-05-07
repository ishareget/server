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

    async create(ctx) {
        try {
            const data = ctx.request.body;
            const sql = `INSERT INTO web_notification (username, groupid, mission_id, noti_time, motion, status) VALUES ('${data.username}', ${data.groupid}, ${data.mission_id}, '${data.noti_time}', '${data.motion}', 0)`;
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query(sql);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

}

export default new Notification();