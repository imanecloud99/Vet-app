const request = require('supertest');

describe('/users tests', () => {
    const connectionString = 'mongodb://localhost/PetVetDb-test';
    let app = null;
    let cookie = null;

    after(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => db.dropDatabase());
    });

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('POST /register', () => {
        it('expect to return 200 (OK)', (done) => {
            request(app)
                .post('/register')
                .send({
                    username: 'gosho',
                    fullName: 'gosho goshev',
                    email: 'gosho@mail.bg',
                    password: 'password',
                    phone: '1234567890',
                    address: 'mladost,al.malinov',
                    isAdmin: 'true',
                    gender: 'male',
                    acceptPolicy: 'on',
                })
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('POST /login', () => {
        it('expect to return 302 (Found)', (done) => {
            request(app)
                .post('/login')
                .send({ username: 'gosho', password: 'password' })
                .expect(302)
                .expect('Location', '/profile')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    cookie = res.headers['set-cookie'];
                    return done();
                });
        });
    });

    describe('GET /chat', () => {
        it('expect to return 200 (OK)', (done) => {
            request(app)
                .get('/chat')
                .set('cookie', cookie)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /login', () => {
        it('expect to return 200 (OK)', (done) => {
            request(app)
                .get('/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /register', () => {
        it('expect to return 200 (OK)', (done) => {
            request(app)
                .get('/register')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /profile', () => {
        it('expect to return 200 (OK)', (done) => {
            request(app)
                .get('/profile')
                .set('cookie', cookie)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('PUT /profile', () => {
        it('expect to return 302 (Found)', (done) => {
            request(app)
                .put('/profile')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('GET /logout', () => {
        it('expect to return 302 (Found)', (done) => {
            request(app)
                .get('/logout')
                .expect(302)
                .expect('Location', '/')
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});
