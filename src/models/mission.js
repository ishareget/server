import mysql from 'mysql2/promise';
import config from '../config/db';
import R from 'ramda';
import fs from 'fs';
import path from 'path';
import md5 from 'md5';

import {
    connect
} from 'net';

class Mission {

    async find(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query('SELECT * FROM web_mission ORDER BY missioncreatedate DESC LIMIT 1000');
            connection.close();
            if (rows.length === 0) {
                return false
            }
            return rows;
        } catch (e) {
            return false;
        }
    }

    async findById(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query('SELECT * FROM web_mission WHERE id = ?', [ctx.params.uid]);
            connection.close();
            return rows;
        } catch (e) {
            return false;
        }
    }

    async findByUser(ctx) {
        try {
            const sql = `SELECT * FROM web_mission WHERE missiongroup = "${ctx.params.uid}"`;
            const connection = await mysql.createConnection(config);
            const [rows, fields2] = await connection.query(sql + ' LIMIT 1000');
            connection.close();
            if (rows.length !== 0) {
                return rows;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    async findByGroup(ctx) {
        try {
            let sql = `SELECT * FROM web_mission WHERE missiongroup = "${ctx.params.uid}"`;
            const connection = await mysql.createConnection(config);
            const [ishare, fields] = await connection.query('SELECT * FROM web_group WHERE grouptype = "協會" LIMIT 1000');
            ishare.forEach(e => {
                sql += ` OR missiongroup = "${e.id}"`
            });
            const [rows, fields2] = await connection.query(sql + 'ORDER BY id DESC LIMIT 1000');
            connection.close();
            if (rows.length !== 0) {
                return rows;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    async findType(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query('SELECT * FROM web_mission_type');
            connection.close();
            if (rows.length !== 0) {
                return rows;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    async create(ctx) {
        try {
            const data = ctx.request.body;
            const params = [];
            let sql = 'INSERT INTO web_mission (';

            // 動態產出 sql 的 key
            Object.keys(data).forEach((value, index, array) => {
                params.push(data[value]);
                sql += value + ',';
            });
            sql = sql.substr(0, sql.length - 1) + ') VALUES (';
            for (let i = 0; i < params.length; i += 1) {
                sql += '?,';
            }
            sql = sql.substr(0, sql.length - 1) + ')';
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query(sql, params);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

    async update(ctx) {
        try {
            const data = ctx.request.body;
            let params = [];
            const params2 = [data.id];
            let sql = 'UPDATE web_mission SET';

            // 動態產出 sql 的 key
            Object.keys(data).forEach((value, index, array) => {
                if (value !== 'id') {
                    params.push(data[value]);
                    sql += ` ${value} = ?,`;
                }
            });

            params = R.concat(params, params2);
            sql = sql.substr(0, sql.length - 1) + ' WHERE id = ?';
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query(sql, params);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

    async delete(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query('DELETE FROM web_mission WHERE id = ?', [ctx.request.body.id]);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

    async verify(ctx) {
        try {
            const data = ctx.request.body;
            let params = [];
            const params2 = [data.missionid, data.studentusername];
            let sql = 'UPDATE web_mission_join SET';
            // 動態產出 sql 的 key
            Object.keys(data).forEach((value, index, array) => {
                if (R.and(value !== 'missionid', value !== 'studentusername')) {
                    params.push(data[value]);
                    sql += ` ${value} = ?,`;
                }
            });
            params = R.concat(params, params2);
            sql = sql.substr(0, sql.length - 1) + ' WHERE missionid = ? AND studentusername = ?';
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query(sql, params);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

    async give(ctx) {
        try {
            const params = [
                ctx.request.body.status,
                ctx.request.body.givetime,
                ctx.request.body.giveusername,
                ctx.request.body.missionid,
                ctx.request.body.username
            ];
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query('UPDATE web_mission_join SET status = ? , sendtime = ? , sendusername = ? WHERE missionid = ? AND studentusername = ?', params);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

    async signature(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query('SELECT web_student.username , web_student.name , web_mission_join.signaturestatus , web_mission_join.signaturedate , web_mission_join.signatureremark  FROM web_mission_join , web_student WHERE web_mission_join.studentusername = web_student.username AND web_mission_join.missionid = ? ORDER BY web_mission_join.signaturedate', [ctx.params.uid]);
            connection.close();
            return rows;
        } catch (e) {
            return false;
        }
    }

    async punchin(ctx) {
        try {
            const params = [
                ctx.request.body.signaturestatus,
                ctx.request.body.signaturedate,
                ctx.request.body.missionid,
                ctx.request.body.studentname
            ];
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query('UPDATE web_mission_join SET signaturestatus = ? , signaturedate = ? WHERE missionid = ? AND studentusername = ?', params);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }
}

export default new Mission();