import mysql from 'mysql2/promise';
import config from '../config/db';

class Group {

    async find(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query('SELECT * FROM web_group LIMIT 1000');
            connection.close();
            return rows;
        } catch (e) {
            return false;
        }
    }

    async findById(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query(`SELECT * FROM web_group WHERE id = ${ctx.params.uid}`);
            connection.close();
            return rows;
        } catch (e) {
            return false;
        }
    }
}

export default new Group();