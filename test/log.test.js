// log.test.js
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

describe('Log', () => {
    it('Log should be an object with keys and values', (done) => {
        api.get('/log')
            .set('Authorization', `Bearer ${APItoken}`)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);

                // 登入帳號
                expect(res.body[0]).to.have.property('loginusername');
                expect(res.body[0].loginusername).to.be.a('string');

                // 登入時間
                expect(res.body[0]).to.have.property('logintime');
                expect(res.body[0].logintime).to.be.a('string');

                // 登入IP
                expect(res.body[0]).to.have.property('loginip');
                expect(res.body[0].loginip).to.be.a('string');

                done();
            });
    });
    it('should return a 401 response', (done) => {
        api.get('/log')
            .expect(401, done);
    });
});