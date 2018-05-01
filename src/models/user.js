import mysql from 'mysql2/promise';
import config from '../config/db';
import log from './log';
import jwt from 'jsonwebtoken';
import util from 'util';
import moment from 'moment';
import R from 'ramda';

const verify = util.promisify(jwt.verify);
const secret = {
    sign: process.env.JWT_SECRET,
};

class User {

    async login(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query(`SELECT * FROM web_user WHERE BINARY username  = "${ctx.request.body.userId}" AND password  = "${ctx.request.body.userPwd}"`);
            if (rows.length === 0) { return false }
            let sql = `SELECT * FROM web_permission WHERE type = '${rows[0].type}'`;
            const [result] = await connection.query(sql);
            if (result.length === 0) { return false }
            sql = `SELECT * FROM web_${result[0].tablename}`;
            if (ctx.request.body.back === 1) {
                if (!result.enterdashboard) { return false }
            } else if (ctx.request.body.back !== undefined) {
                return false;
            }

            const [rows2, fields2] = await connection.query(sql + ` WHERE username = "${ctx.request.body.userId}"`);
            const userToken = {
                name: ctx.request.body.userId,
                logingroup: rows[0].type,
                groupid: rows2[0].groupid
            }
            const token = userToken.logingroup === 5 ? jwt.sign(userToken, secret.sign) : jwt.sign(userToken, secret.sign, { expiresIn: '1h' });
            const body = {
                status: 'token success',
                token
            }
            let cip = ctx.request.headers['x-forwarded-for'];
            if (cip === undefined) {
                cip = ctx.request.ip === '::1' ? '127.0.0.1' : ctx.request.ip;
            }
            const params = [
                userToken.name,
                moment().format('YYYY-MM-DD HH:mm:ss'),
                cip
            ];
            const [result2] = await connection.query('INSERT INTO web_log (loginusername, logintime, loginip) VALUES (?, ?, ?)', params);
            connection.close();
            return body;
        } catch (e) {
            return false;
        }

    }

    async userinfo(ctx) {

        try {
            const payload = ctx.state.user;
            let sql = `SELECT * FROM web_permission WHERE type = '${payload.logingroup}'`;
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query(sql);
            if (result.length === 0) { return false }
            sql = `SELECT * FROM web_${result[0].tablename}`;
            const [rows, fields] = await connection.query(sql + ` WHERE username = "${payload.name}"`);
            connection.close();
            if (rows.length === 0) { return false }
            rows[0].logingroup = payload.logingroup;
            return rows;
        } catch (e) {
            console.log(e);
            return false;
        }

    }

    async permission(ctx) {

        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query(`SELECT * FROM web_permission WHERE type = "${ctx.params.uid}"`);
            connection.close();
            return rows;
        } catch (e) {
            return false;
        }

    }

    async create(ctx) {
        try {
            const payload = ctx.state.user;
            const data = ctx.request.body;
            let sql = `SELECT * FROM web_permission WHERE type = '${data.back}'`;
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query(sql);
            if (result.length === 0) { return false }

            sql = `INSERT INTO web_${result[0].tablename} (`;

            const params = [];
            Object.keys(data).forEach((value, index, array) => {
                if (value !== 'password' && value !== 'back') {
                    params.push(data[value]);
                    sql += ` ${value},`;
                }
            });
            sql = sql.substr(0, sql.length - 1) + ') VALUES (';
            for (let i = 1; i < Object.keys(data).length - 1; i += 1) {
                sql += '?,';
            }
            sql = sql.substr(0, sql.length - 1) + ')';

            const sql2 = `INSERT INTO web_user (username, password, type) VALUE('${data.username}' ,'${data.password}' , ${data.back})`;
            const [result2] = await connection.query(sql2);
            const [result3] = await connection.query(sql, params);
            connection.close();
            if (result3.affectedRows === 0 || result2.affectedRows === 0) { return false }
            return result2;
        } catch (e) {
            return false;
        }
    }

    async update(ctx) {
        try {
            let sql = 'SELECT * FROM web_permission WHERE type = ';
            const payload = ctx.state.user;
            const data = ctx.request.body;
            const connection = await mysql.createConnection(config);
            if (data.back) { sql += `'${data.back}'` } else { sql += `'${payload.logingroup}'` }
            const [result] = await connection.query(sql);
            if (result.length === 0) { return false }
            sql = `UPDATE web_${result[0].tablename} SET`;
            let params = [];
            const params2 = [data.username];
            let change = 0;
            Object.keys(data).forEach((value, index, array) => {
                if (value !== 'password' && value !== 'username' && value !== 'back' && data[value] !== null) {
                    params.push(data[value]);
                    sql += ` ${value} = ?,`;
                }
                if (value === 'password' && data[value] !== null) {
                    change = data[value];
                }
            });
            params = R.concat(params, params2);
            sql = sql.substr(0, sql.length - 1) + ' WHERE username = ?';
            if (change !== 0) {
                const [rows2, fields2] = await connection.query(`UPDATE web_user SET password = ${change} WHERE username = '${payload.name}'`);
                if (rows2.length === 0) { return false }
            }
            console.log(sql, params);
            const [rows, fields] = await connection.query(sql, params);
            connection.close();
            if (rows.length === 0) { return false }
            return rows;
        } catch (e) {
            return false;
        }
    }

    async delete(ctx) {
        try {
            let sql = 'SELECT * FROM web_permission WHERE type = ';
            const connection = await mysql.createConnection(config);
            const payload = ctx.state.user;
            const data = ctx.request.body;
            if (data.back) { sql += `'${data.back}'` } else { sql += `'${payload.logingroup}'` }
            const [result] = await connection.query(sql);
            if (result.length === 0) { return false }
            sql = `DELETE FROM web_${result[0].tablename}`;
            const [result2] = await connection.query(sql + ' WHERE username = ?', [data.username]);
            const [result3] = await connection.query('DELETE FROM web_user WHERE username = ?', [data.username]);
            connection.close();
            if (result2.affectedRows === 0) { return false }
            return result2;
        } catch (e) {
            return false;
        }
    }
}

export default new User();