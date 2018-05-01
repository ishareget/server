import mysql from 'mysql2/promise';
import config from '../config/db';
import R from 'ramda';
import fs from 'fs';
import path from 'path';
import md5 from 'md5';

import {
    connect
} from 'net';

class Participate {

    async findByMission(ctx) {
        try {
            let sql = `SELECT * FROM web_mission_join WHERE studentusername = "${ctx.query.username}" AND missionid= "${ctx.query.missionid}"`;
            if (ctx.query.back === '1') {
                sql = 'SELECT missionlist.*, web_mission_type.missiontype FROM web_mission_type,(SELECT web_mission_join.*,web_mission.missiontype,web_mission.missionpoint,web_mission.missionname FROM web_mission,web_mission_join WHERE web_mission.id = web_mission_join.missionid) as missionlist WHERE web_mission_type.id = missionlist.missiontype';
            } else if (ctx.query.back !== undefined) {
                return false;
            }
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query(sql);
            connection.close();
            if (rows.length === 0) {
                return false
            }
            return rows;
        } catch (e) {
            return false;
        }
    }

    async findByStatus(ctx) {
        try {
            const sql = `SELECT web_group.groupname,web_mission_join.*,web_mission.missiontype,web_mission.missionpoint,web_mission.missionname,web_mission.missioncreatedate FROM web_mission,web_mission_join,web_group WHERE web_mission.id = web_mission_join.missionid and web_group.id = web_mission.missiongroup and web_group.id = "${ctx.query.groupid}" ORDER BY web_mission_join.submittime desc`;
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query(sql);
            connection.close();
            if (rows.length === 0) {
                return false
            }
            return rows;
        } catch (e) {
            return false;
        }
    }

    async findByStudent(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query('SELECT * FROM web_mission,(SELECT * FROM web_mission_join WHERE studentusername = ?) as missionlist WHERE web_mission.id = missionlist.missionid', [ctx.params.uid]);
            connection.close();
            if (rows.length === 0) {
                return false
            }
            return rows;
        } catch (e) {
            return false;
        }
    }

    async create(ctx) {

        try {
            const params = [
                ctx.request.body.missionid,
                ctx.request.body.studentusername,
                ctx.request.body.applytime,
                '已參加'
            ];
            if (ctx.request.body.signaturestatus !== undefined) {
                params.push(ctx.request.body.signaturestatus);
            } else {
                params.push(null);
            }
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query('INSERT INTO web_mission_join (missionid, studentusername, applytime, status, signaturestatus) VALUES (?, ?, ?, ?, ?)', params);
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

    async delete(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query('DELETE FROM web_mission_join WHERE missionid = ? AND studentusername=?', [ctx.request.body.missionid, ctx.request.body.studentusername]);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

}
export default new Participate();