const request = require('supertest');

describe('/other tests', () => {
    const connectionString = 'mongodb://localhost/PetVetDb-test';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('GET /home', () => {
        it('expect to return 200 (OK)', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /aboutUs', () => {
        it('expect to return 200 (OK)', (done) => {
            request(app)
                .get('/aboutUs')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /contactUs', () => {
        it('expect to return 200 (OK)', (done) => {
            request(app)
                .get('/contactUs')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /notFound', () => {
        it('expect to return 200 (OK)', (done) => {
            request(app)
                .get('/notFound')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});
