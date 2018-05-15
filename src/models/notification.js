import mysql from 'mysql2/promise';
import config from '../config/db';

class Notification {

    async findByusername(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [row, field] = await connection.query('Select * from web_notification Where username = ? ORDER BY noti_time DESC', [ctx.request.body.username]);
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
            const connection = await mysql.createConnection(config);
            const sql = `INSERT INTO web_notification (username, groupid, mission_id, noti_time, description, status, type) VALUES ('${data.username}', ${data.groupid}, ${data.mission_id}, '${data.noti_time}', '${data.description}', 0, '${data.type}')`;
            const [result] = await connection.query(sql);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

    async update(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query(`UPDATE web_notification SET status = 1 Where id = ${ctx.request.body.id}`);
            return result;
        } catch (e) {
            return false;
        }
    }

}

export default new Notification();