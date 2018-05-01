import mysql from 'mysql2/promise';
import config from '../config/db';

class Record {

    async find(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            let sql;

            if (ctx.query.username !== undefined) {
                sql = `SELECT * FROM web_record,web_store WHERE web_record.recordstore = web_store.username AND web_record.recordstudent = "${ctx.query.username}" ORDER BY web_record.recordtime DESC`;
            } else {
                sql = 'SELECT * FROM web_record ORDER BY web_record.recordtime DESC';
            }

            const [rows, fields] = await connection.query(sql);
            if (rows.length === 0) { return false }
            connection.close();
            return rows;
        } catch (e) {
            return false;
        }
    }

    async create(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const params = [
                ctx.request.body.recordchild,
                ctx.request.body.recordpoint,
                ctx.request.body.recordcost,
                ctx.request.body.recordstore,
                ctx.request.body.recordtime
            ];
            const [result] = await connection.query('INSERT INTO web_record (recordstudent, recordpoint, recordcost, recordstore, recordtime) VALUES (?, ?, ?, ?, ?)', params);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }
}

export default new Record();