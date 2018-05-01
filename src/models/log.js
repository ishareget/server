import mysql from 'mysql2/promise';
import config from '../config/db';
import datetime from 'date-time';

class Log {

    async find(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query('SELECT * FROM web_log ORDER BY id DESC LIMIT 1000');
            connection.close();
            return rows;
        } catch (e) {
            return false
        }
    }
    async clean(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query('TRUNCATE TABLE web_log;');
            connection.close();
            return rows;
        } catch (e) {
            return false
        }
    }
}

export default new Log();