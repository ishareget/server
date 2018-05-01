import mysql from 'mysql2/promise';
import config from '../config/db';
import R from 'ramda';
import fs from 'fs';
import path from 'path';
import md5 from 'md5';

import {
    connect
} from 'net';
import {
    Connection
} from 'mysql2';


export default async function Roles(ctx, next) {
    const data = ctx.originalUrl.replace('/api/', '').split('/');
    for (let i = 0; i < data.length; i += 1) {
        data[i] = data[i].split('?')[0];
    }
    const sql = `SELECT * FROM web_api WHERE type = '${ctx.state.user.logingroup}' AND route = ` + (data.length === 1 || data[1] === '' ? '"find"' : `'${data[1]}'`);
    const connection = await mysql.createConnection(config);
    const [rows, fields] = await connection.query(sql);
    if (rows[0]['api_' + data[0]] === 1) {
        return next();
    }
    return ctx.throw(403, 'No Promission!!')

}

// "1": "學生",
// "2": "老師",
// "3": "志工",
// "4": "管理員"


/* example

web_mission
name  id mission carousel ...
 學生  1    1       2
 行政  2    3       4
 管理  3    5       6
 打雜  4    7       8

 web_api
 id     url   C R U D
  1  mission  0 1 0 0
  2  carousel 0 1 1 1
  3  mission  1 1 1 0
  4  carousel 1 1 1 0
  5  mission  1 1 1 1
  6  carousel 1 1 1 1

備註
C = add
R = ???
U = update
D = delete

說明:
1.取得身分
const group = payload.logingroup

2.取得請求 API 名稱以及方法
const api_name = ctx.originalUrl.split('/')[0]
const api_method = ctx.originalUrl.split('/')[1]  // 不一定都是這寫法

3.從 web_mission 找到身分 的方法編號
select [api_name] AS [api_id] from web_mission where id = [group]

4.從 web_api 找到方法(CRUD)的許可
select [api_method] AS [api_result] from web_api where id = [api_id]

[api_result]==1 ? 許可 : 拒絕

*/