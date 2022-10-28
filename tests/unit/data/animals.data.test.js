const { expect } = require('chai');
const sinon = require('sinon');

const AnimalsData = require('../../../data/animals.data');

describe('AnimalsData', () => {
    const db = {
        collection: () => {
        },
    };

    let ModelClass = null;
    const validator = null;
    let data = null;

    ModelClass = class {
    };

    const animals = [{
        name: 'kotka',
        breed: 'cat',
        ownerUsername: 'Pesho',
        ownerId: '11',
        ownerAddress: 'address 1',
        ownerPhone: '0888888888',
    },
        {
            name: 'dragon',
            breed: 'bird',
            ownerUsername: 'Gosho',
            ownerId: '22',
            ownerAddress: 'address 2',
            ownerPhone: '0878878878',
        },
        {
            name: 'dino',
            breed: 'dinosaur',
            ownerUsername: 'Pesho',
            ownerId: '11',
            ownerAddress: 'address 1',
            ownerPhone: '0888888888',
        },
    ];

    const getAnimalsByOwnerUsername = (username) => {
        let result = 0;
        for (const animal of animals) {
            if (animal.ownerUsername === username) {
                result++;
            }
        }

        return Promise.resolve(result);
    };

    const updateAnimal = (ownerId, ownerPhone, ownerAddress) => {
        let updatedAnimals = 0;

        for (const animal of animals) {
            if (ownerId === animal.ownerId) {
                animal.ownerPhone = ownerPhone;
                animal.ownerAddress = ownerAddress;
                updatedAnimals++;
            }
        }

        return Promise.resolve(updatedAnimals);
    };

    sinon.stub(db, 'collection')
        .callsFake(() => {
            return { getAnimalsByOwnerUsername, updateAnimal };
        });

    data = new AnimalsData(db, ModelClass, validator);

    describe('getAnimalsByOwnerUsername()', () => {
        it('expect to return all animals by their owner username', () => {
            return data.collection.getAnimalsByOwnerUsername('Pesho')
                .then((arr) => {
                    expect(arr).to.eql(2);
                });
        });
    });

    describe('updateAnimal()', () => {
        it('expect to change animal\'s owner phone and address', () => {
            return data.collection.updateAnimal('11', '0898989989', 'BUL 1')
                .then((counter) => {
                    expect(counter).to.eql(2);
                });
        });
    });
});
