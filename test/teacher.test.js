// teacher.test.js
/* global describe it before */

import { expect } from 'chai';
import supertest from 'supertest';
import User from './util/user'

const api = supertest('http://localhost:3000/api');

let APItoken;

before((done) => {
    api.post('/user/login')
        .set('Accept', 'application/json')
        .send(User.admin)
        .expect(200)
        .end((err, res) => {
            APItoken = res.body.token;
            done();
        });
});

describe('Teacher', () => {
    it('Teacher should be an object with keys and values', (done) => {
        api.get('/teacher')
            .set('Authorization', `Bearer ${APItoken}`)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);

                // 帳號
                expect(res.body[0]).to.have.property('username');
                expect(res.body[0].username).to.be.a('string');

                // 姓名
                expect(res.body[0]).to.have.property('name');
                expect(res.body[0].name).to.be.a('string');

                // 單位
                expect(res.body[0]).to.have.property('groupid');
                expect(res.body[0].groupid).to.be.a('number');

                // 電話
                expect(res.body[0]).to.have.property('tel');
                if (res.body[0].tel !== null) {
                    expect(res.body[0].tel).to.be.a('string');
                }

                // 性別
                expect(res.body[0]).to.have.property('gender');
                expect(res.body[0].gender).to.be.a('string');
                expect(res.body[0].gender).to.be.oneOf(['女', '男']);

                // 大頭照
                expect(res.body[0]).to.have.property('picture');
                expect(res.body[0].picture).to.be.a('string');
                expect(res.body[0].picture).to.include('/assets/activity/user/');

                // 電子信箱
                expect(res.body[0]).to.have.property('email');
                if (res.body[0].email !== null) {
                    expect(res.body[0].email).to.be.a('string');
                    expect(res.body[0].email).to.include('@');
                }

                // 學校名稱
                expect(res.body[0]).to.have.property('school');
                expect(res.body[0].school).to.be.a('string');

                done();
            });
    });
    it('should return a 401 response', (done) => {
        api.get('/student')
            .expect(401, done);
    });
});