// mission.test.js
/* global describe it before */

import { expect } from 'chai';
import supertest from 'supertest';
import User from './util/user'

const api = supertest('http://localhost:3000/api');

let APItoken;

before((done) => {
    api.post('/user/login')
        .set('Accept', 'application/json')
        .send(User.teacher)
        .expect(200)
        .end((err, res) => {
            APItoken = res.body.token;
            done();
        });
});

describe('Mission', () => {
    it('Mission should be an object with keys and values', (done) => {
        api.get('/mission')
            .expect(200)
            .end((err, res) => {
                if (err) done(err);

                // 任務名稱
                expect(res.body[0]).to.have.property('missionname');
                expect(res.body[0].missionname).to.be.a('string');

                // 任務類型
                expect(res.body[0]).to.have.property('missiontype');
                expect(res.body[0].missiontype).to.be.a('number');

                // 任務內容
                expect(res.body[0]).to.have.property('missioncontent');
                expect(res.body[0].missioncontent).to.be.a('string');

                // 任務建立者
                expect(res.body[0]).to.have.property('missioncreater');
                expect(res.body[0].missioncreater).to.be.a('string');

                // 任務歸屬單位
                expect(res.body[0]).to.have.property('missiongroup');
                expect(res.body[0].missiongroup).to.be.a('number');

                // 任務狀態
                expect(res.body[0]).to.have.property('status');
                expect(res.body[0].status).to.be.a('string');

                done();
            });
    });
    it('should return a 401 response', (done) => {
        api.get('/mission/group/1')
            .expect(401, done);
    });
    it('should return a 200 response', (done) => {
        api.get('/mission/type')
            .expect(200, done);
    });
});
