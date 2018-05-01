import mysql from 'mysql2/promise';
import config from '../config/db';

class Store {

    async find(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query('SELECT * FROM web_store LIMIT 1000');
            connection.close();
            return rows;
        } catch (e) {
            return false;
        }
    }

    async findById(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query('SELECT * FROM web_store WHERE id = ?', [ctx.params.id]);
            connection.close();
            return rows;
        } catch (e) {
            return false;
        }
    }

    async add(ctx) {
        try {
            const params = [
                ctx.request.body.storeusername,
                ctx.request.body.storepassword,
                ctx.request.body.storename,
                ctx.request.body.storeaddr,
                ctx.request.body.storeadminstore,
                ctx.request.body.storetel,
                ctx.request.body.storeein,
                ctx.request.body.storetype,
                ctx.request.body.storephoto
            ];
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query('INSERT INTO web_store (storeusername, storepassword, storename, storeaddr, storeadminstore, storetel, storeein, storetype, storephoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', params);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

    async update(ctx) {
        try {
            const params = [
                ctx.request.body.storename,
                ctx.request.body.storeaddr,
                ctx.request.body.storeadminstore,
                ctx.request.body.storetel,
                ctx.request.body.storeein,
                ctx.request.body.storetype,
                ctx.request.body.storephoto,
                ctx.request.body.id
            ];
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query('UPDATE web_store SET storename = ?, storeaddr = ? , storeadminstore = ? , storetel = ? , storeein = ? , storetype = ? , storephoto = ? WHERE id = ?', params);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

    async delete(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query('DELETE FROM web_store WHERE id = ?', [ctx.request.body.id]);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }
}

export default new Store();