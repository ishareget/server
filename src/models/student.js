import mysql from 'mysql2/promise';
import config from '../config/db';
import R from 'ramda';
import fs from 'fs';
import path from 'path';
import md5 from 'md5';

class Student {

    async find(ctx) {
        let sql = 'SELECT * FROM web_student';

        try {
            if (ctx.query.username !== undefined) {
                sql += ` WHERE username = "${ctx.query.username}"`

                if (ctx.query.give !== undefined) {
                    sql = `SELECT * FROM web_mission,web_mission_join WHERE web_mission.id = web_mission_join.missionid AND web_mission_join.studentusername = "${ctx.query.username}" AND web_mission_join.sendtime IS NOT NULL  ORDER BY web_mission_join.sendtime DESC`
                }

            }
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query(sql + ' LIMIT 1000');
            if (rows.length === 0) { return false }
            connection.close();
            return rows;
        } catch (e) {
            return false
        }
    }
}

export default new Student();