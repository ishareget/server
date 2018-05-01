// carousel.test.js
/* global describe it before */

import { expect } from 'chai';
import supertest from 'supertest';
import User from './util/user'

const api = supertest('http://localhost:3000/api');

let APItoken;

before((done) => {
    api.post('/user/login')
        .set('Accept', 'application/json')
        .send(User.student)
        .expect(200)
        .end((err, res) => {
            APItoken = res.body.token;
            done();
        });
});

describe('Carousel', () => {
    it('Carousel should be an object with keys and values', (done) => {
        api.get('/carousel')
            .expect(200)
            .end((err, res) => {
                if (err) done(err);

                // 順序
                expect(res.body[0]).to.have.property('picturesort');
                expect(res.body[0].picturesort).to.be.a('number');

                // 內容
                expect(res.body[0]).to.have.property('picturecontent');
                expect(res.body[0].picturecontent).to.be.a('string');

                // 圖片網址
                expect(res.body[0]).to.have.property('pictureurl');
                expect(res.body[0].pictureurl).to.be.a('string');
                expect(res.body[0].pictureurl).to.include('/assets/dashboard/');

                // 連結網址
                expect(res.body[0]).to.have.property('picturelink');
                expect(res.body[0].picturelink).to.be.a('string');
                expect(res.body[0].picturelink).to.include('http');

                done();
            });
    });
});