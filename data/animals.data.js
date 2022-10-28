const BaseData = require('./base/base.data');
const Animal = require('../models/animal.model');
const ObjectID = require('mongodb').ObjectID;

class AnimalsData extends BaseData {
    constructor(db) {
        super(db, Animal, Animal);
    }

    getAnimalsByOwnerUsername(username) {
        let result = this.collection
            .find({ 'ownerUsername': username })
            .toArray();

        if (this.ModelClass.toViewModel) {
            result = result.then((models) => {
                return models
                    .map((obj) =>
                        this.ModelClass.toViewModel(obj));
            });
        }
        return result;
    }

    updateAnimal(model) {
        this.collection.updateMany(
            { 'ownerId': model.ownerId },
            {
                $set: {
                    ownerAddress: model.ownerAddress,
                    ownerPhone: model.ownerPhone,
                },
            })
            .then(() => {
                this.collection.updateOne(
                    { _id: new ObjectID(model._id) },
                    {
                        $set: {
                            checkUp: model.checkUp,
                        },
                    });
            })
            .then(() => {
                this.db.collection('users').updateOne(
                    { _id: new ObjectID(model.ownerId) },
                    {
                        $set: {
                            address: model.ownerAddress,
                            phone: model.ownerPhone,
                        },
                    });
            });
    }
}

module.exports = AnimalsData;
