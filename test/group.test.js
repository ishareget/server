// group.test.js
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

describe('Group', () => {
    it('Group should be an object with keys and values', (done) => {
        api.get('/group')
            .set('Authorization', `Bearer ${APItoken}`)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);

                // 單位代號
                expect(res.body[0]).to.have.property('groupname');
                expect(res.body[0].groupname).to.be.a('string');

                // 單位描述
                expect(res.body[0]).to.have.property('name');
                expect(res.body[0].name).to.be.a('string');

                // 單位類型
                expect(res.body[0]).to.have.property('grouptype');
                expect(res.body[0].grouptype).to.be.a('string');

                done();
            });
    });
    it('should return a 401 response', (done) => {
        api.get('/log')
            .expect(401, done);
    });
});