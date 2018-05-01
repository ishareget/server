import mysql from 'mysql2/promise';
import config from '../config/db';
import R from 'ramda';
import fs from 'fs';
import path from 'path';
import md5 from 'md5';

class Upload {

    async participate(ctx) {

        try {
            const data = JSON.parse(ctx.request.body.fields.photoData);
            let picture = '';
            let arr = [];
            // 判斷數量
            if (ctx.request.body.files.files !== undefined) {
                if (ctx.request.body.files.files.length === undefined) {
                    arr[0] = ctx.request.body.files.files;
                } else {
                    arr = ctx.request.body.files.files;
                }
            }
            if (arr !== undefined) {
                arr.forEach(file => {
                    const reader = fs.createReadStream(file.path);
                    if (!fs.existsSync('./src/public/assets/activity')) {
                        fs.mkdirSync('./src/public/assets/activity')
                    }
                    if (!fs.existsSync('./src/public/assets/activity/user')) {
                        fs.mkdirSync('./src/public/assets/activity/user')
                    }
                    if (!fs.existsSync('./src/public/assets/activity/user/' + data.studentusername)) {
                        fs.mkdirSync('./src/public/assets/activity/user/' + data.studentusername);
                    }
                    if (!fs.existsSync(`./src/public/assets/activity/user/${data.studentusername}/${data.missionid}`)) {
                        fs.mkdirSync(`./src/public/assets/activity/user/${data.studentusername}/${data.missionid}`);
                    }
                    const datetime = data.submittime.replace(/-/g, '').replace(/ /g, '').replace(/:/g, '');
                    const typename = file.name.split('.');
                    const filename = parseInt(Math.random() * 10, 10) + datetime + '.' + typename[1];
                    const stream = fs.createWriteStream(path.resolve(__dirname, `../public/assets/activity/user/${data.studentusername}/${data.missionid}`, filename.toString()));
                    reader.pipe(stream);
                    picture = `./assets/activity/user/${data.studentusername}/${data.missionid}/${filename.toString()};`;
                });
            }
            return picture;
        } catch (e) {
            return false;
        }
    }

    async mission(ctx) {
        try {
            const imgData = ctx.request.body.url;
            const base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
            if (!fs.existsSync('./src/public/assets/activity')) {
                fs.mkdirSync('./src/public/assets/activity')
            }
            if (!fs.existsSync('src/public/assets/activity/mission')) {
                fs.mkdirSync('src/public/assets/activity/mission');
            }
            const dataBuffer = Buffer.from(base64Data, 'base64');
            const datetime = new Date();
            let datetime2 = JSON.stringify(datetime);
            datetime2 = datetime2.replace(/\..+/, '').replace(/[#,+()$~%.'":*?<>{}T-]/g, '');
            const filename = md5(parseInt(Math.random() * 100, 10) + datetime2) + '.' + ctx.request.body.filetype;
            fs.writeFile(path.resolve(__dirname, '../public/assets/activity/mission/', filename), dataBuffer, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('file written successfully');
                }
            });
            return './assets/activity/mission/' + filename;
        } catch (e) {
            return false;
        }
    }

    async carousel(ctx) {
        try {
            const imgData = ctx.request.body.url;
            const base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
            if (!fs.existsSync('./src/public/assets/dashboard')) {
                fs.mkdirSync('./src/public/assets/dashboard')
            }
            const dataBuffer = Buffer.from(base64Data, 'base64');
            const datetime = new Date();
            let datetime2 = JSON.stringify(datetime);
            datetime2 = datetime2.replace(/\..+/, '').replace(/[#,+()$~%.'":*?<>{}T-]/g, '');
            const filename = md5(parseInt(Math.random() * 100, 10) + datetime2) + '.' + ctx.request.body.filetype;
            console.log(filename);
            fs.writeFile(path.resolve(__dirname, '../public/assets/dashboard/', filename), dataBuffer, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('file written successfully');
                }
            });
            return './assets/dashboard/' + filename;
        } catch (e) {
            return false;
        }
    }

    async profile(ctx) {
        try {
            const imgData = ctx.request.body.url;
            const base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
            if (!fs.existsSync('./src/public/assets/activity')) {
                fs.mkdirSync('./src/public/assets/activity')
            }
            if (!fs.existsSync('./src/public/assets/activity/user')) {
                fs.mkdirSync('./src/public/assets/activity/user')
            }
            if (!fs.existsSync('./src/public/assets/activity/user/' + ctx.request.body.username)) {
                fs.mkdirSync('./src/public/assets/activity/user/' + ctx.request.body.username);
            }
            const dataBuffer = Buffer.from(base64Data, 'base64');
            const datetime = new Date();
            let datetime2 = JSON.stringify(datetime);
            datetime2 = datetime2.replace(/\..+/, '').replace(/[#,+()$~%.'":*?<>{}T-]/g, '');
            const filename = md5(parseInt(Math.random() * 100, 10) + datetime2) + '.' + ctx.request.body.filetype;
            fs.writeFile(path.resolve(__dirname, '../public/assets/activity/user/' + ctx.request.body.username, filename.toString()), dataBuffer, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('file written successfully');
                }
            });
            return './assets/activity/user/' + ctx.request.body.username + '/' + filename.toString() + ';';
        } catch (e) {
            return false;
        }
    }
}

export default new Upload();