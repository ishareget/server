import mysql from 'mysql2/promise';
import config from '../config/db';
import fs from 'fs';
import path from 'path';

class Carousel {

    async find(ctx) {
        const sql = 'SELECT * FROM web_carousel'
        try {
            const connection = await mysql.createConnection(config);
            const [rows, fields] = await connection.query(sql + '  ORDER BY Case WHEN picturesort = 0 THEN 1 END , picturesort ASC LIMIT 1000');
            connection.close();
            return rows;
        } catch (e) {
            return false
        }
    }

    async create(ctx) {
        try {
            const params = [
                ctx.request.body.picturesort,
                ctx.request.body.picturecontent,
                ctx.request.body.pictureurl,
                ctx.request.body.picturelink
            ];
            const data = ctx.request.body;
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query('INSERT INTO web_carousel (picturesort, picturecontent, pictureurl, picturelink) VALUES (?, ?, ?, ?)', params);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

    async update(ctx) {
        try {
            const params = [
                ctx.request.body.picturesort,
                ctx.request.body.picturecontent,
                ctx.request.body.pictureurl,
                ctx.request.body.picturelink,
                ctx.request.body.id
            ];
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query('UPDATE web_carousel SET picturesort = ? , picturecontent = ? , pictureurl = ? , picturelink = ? WHERE id = ?', params);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }

    async delete(ctx) {
        try {
            const connection = await mysql.createConnection(config);
            const [result] = await connection.query('DELETE FROM web_carousel WHERE id = ?', [ctx.request.body.id]);
            connection.close();
            return result;
        } catch (e) {
            return false;
        }
    }
}

export default new Carousel();