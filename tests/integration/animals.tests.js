const request = require('supertest');

describe('/animals tests', () => {
    const connectionString = 'mongodb://localhost/PetVetDb-test';
    let app = null;
    let cookie = null;

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
                    username: 'pesho',
                    fullName: 'pesho peshev',
                    email: 'pesho@mail.bg',
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
                .send({ username: 'pesho', password: 'password' })
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

    describe('GET /allAnimals', () => {
        it('expect to return 200 (OK)', (done) => {
            request(app)
                .get('/allAnimals')
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

    describe('GET /petsCare', () => {
        it('expect to return 200 (OK)', (done) => {
            request(app)
                .get('/petsCare')
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

    describe('PUT /animals', () => {
        it('expect to return 302 (Found)', (done) => {
            request(app)
                .put('/animals')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });

    describe('POST /animals', () => {
        it('expect to return 302 (Found)', (done) => {
            request(app)
                .post('/animals')
                .set('cookie', cookie)
                .send({
                    name: 'Kotangens',
                    type: 'Cat',
                    breed: 'ulichna',
                    birthDate: '17-07-2017',
                    ownerId: '59778064040d680f00212ddf',
                    ownerUsername: 'nikola',
                    ownerAddress: 'nikolanikola',
                    ownerPhone: 'nikolanikola',
                    checkUp: 'no check-ups',
                })
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});
