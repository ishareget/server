// record.test.js
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

describe('Record', () => {
    it('Record should be an object with keys and values', (done) => {
        api.get('/record')
            .set('Authorization', `Bearer ${APItoken}`)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);

                // 學童帳號
                expect(res.body[0]).to.have.property('recordstudent');
                expect(res.body[0].recordstudent).to.be.a('string');

                // 剩餘點數
                expect(res.body[0]).to.have.property('recordpoint');
                expect(res.body[0].recordpoint).to.be.a('number');

                // 扣除點數
                expect(res.body[0]).to.have.property('recordcost');
                expect(res.body[0].recordcost).to.be.a('number');

                // 兌換店家
                expect(res.body[0]).to.have.property('recordstore');
                expect(res.body[0].recordstore).to.be.a('string');

                // 兌換時間
                expect(res.body[0]).to.have.property('recordtime');
                expect(res.body[0].recordtime).to.be.a('string');

                done();
            });
    });
    it('should return a 401 response', (done) => {
        api.get('/log')
            .expect(401, done);
    });
});