const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const ObjectID = require('mongodb').ObjectID;

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    checkPassword(username, password) {
        return this.collection.findOne({
            username,
        })
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid username or password!');
                }
                if (user.password !== password) {
                    throw new Error('Invalid username or password!');
                }
                return true;
            });
    }

    create(model) {
        const username = model.username.toLowerCase();
        return this.collection
            .findOne({ username })
            .then((user) => {
                if (!user) {
                    return super.create(model);
                }
                throw new Error('USERNAME ALREADY EXISTS!');
            });
    }

    findByUsername(username) {
        const regex = new RegExp(username, 'i');
        return this.collection.findOne({ username: regex });
    }

    findById(userId) {
        const user = this.collection.findOne({
            _id: new ObjectID(userId),
        });

        return Promise.resolve(user);
    }

    updateUser(model) {
        this.collection.updateOne(
            { _id: new ObjectID(model._id) },
            {
                $set: {
                    fullName: model.fullName,
                    address: model.address,
                    phone: model.phone,
                    password: model.password,
                },
            })
            .then(() => {
                this.db.collection('animals').updateMany(
                    { 'ownerId': model._id },
                    {
                        $set: {
                            ownerAddress: model.address,
                            ownerPhone: model.phone,
                        },
                    });
            });
    }
}

module.exports = UsersData;
