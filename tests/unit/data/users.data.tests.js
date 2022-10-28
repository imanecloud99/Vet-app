const { expect } = require('chai');
const sinon = require('sinon');

const UsersData = require('../../../data/users.data');

describe('UsersData', () => {
    const db = {
        collection: () => {
        },
    };

    let users = [];
    const animals = ['dragon', 'ant'];
    let ModelClass = null;
    const validator = null;
    let data = null;

    const searchedUser = {
        username: 'user',
        password: '123456',
    };

    const toArray = () => {
        return Promise.resolve(searchedUser);
    };
    const find = (user) => {
        return {
            toArray,
        };
    };

    const create = (user) => {
        users.push(user);
    };

    const foundUser = { username: 'user', password: '123456' };

    const findOne = (user) => {
        return Promise.resolve(foundUser);
    };

    const findById = (id) => {
        return Promise.resolve(users[1]);
    };

    const updateUser = (userId, username, password) => {
        let updatedUsers = 0;

        for (const u of users) {
            if (userId === u._id) {
                u.username = username;
                u.password = password;
                updatedUsers++;
            }
        }

        return Promise.resolve(updatedUsers);
    };

    const checkPassword = (username, password) => {
        let isValid = false;
        for (const user of users) {
            if (user.username === username && user.password === password) {
                isValid = true;
            }
        }

        return Promise.resolve(isValid);
    };

    beforeEach(() => {
        users = [{
            _id: '596b1d2cfef2e82704d679e4',
            username: 'userOne',
            password: '123456',
            animals: animals,
        },
            {
                _id: '596b2a0ae6239d22044adb29',
                username: 'userTwo',
                password: '654321',
            }];

        ModelClass = class {
        };

        sinon.stub(db, 'collection')
            .callsFake(() => {
                return {
                    findOne,
                    find,
                    create,
                    findById,
                    updateUser,
                    checkPassword,
                };
            });

        data = new UsersData(db, ModelClass, validator);
    });

    afterEach(() => {
        db.collection.restore();
    });


    describe('create()', () => {
        it('expect to create user if there is not user ' +
            'with that username', () => {
            const userToCreate = {
                username: 'testUser',
                password: '111111',
            };

            const currentLength = users.length;
            data.collection.create(userToCreate);
            expect(users).to.lengthOf(currentLength + 1);
        });
    });

    describe('findUserByUsername()', () => {
        it('expect to return users if users were found', () => {
            return data.collection.findOne('user')
                .then((found) => {
                    expect(found).to.deep.eql(searchedUser);
                });
        });

        it('expect to return null if users were not found', () => {
            return data.collection.findOne('pesho')
                .then((user) => {
                    expect(user).to.not.equal(searchedUser);
                });
        });
    });

    describe('findById()', () => {
        it('expect to return user if user was found', () => {
            return data.collection.findById('596b2a0ae6239d22044adb29')
                .then((user) => {
                    expect(users[1]).to.deep.eql(user);
                });
        });
    });

    describe('updateUser()', () => {
        it('expect to change users\'s data', () => {
            return data.collection
                .updateUser('596b2a0ae6239d22044adb29',
                    'PeshoNeEGosho', 'BULGARIA')
                .then((counter) => {
                    expect(counter).to.eql(1);
                });
        });
    });

    describe('checkPassword()', () => {
        it('expect to pass password check when it is valid', () => {
            return data.collection.checkPassword('userOne', '123456')
                .then((result) => {
                    expect(result).to.deep.eql(true);
                });
        });

        it('expect to fail password check when it is valid', () => {
            return data.collection.checkPassword('userOne', '111111')
                .then((result) => {
                    expect(result).to.deep.eql(false);
                });
        });
    });
});
