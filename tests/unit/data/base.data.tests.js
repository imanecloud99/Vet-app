const { expect } = require('chai');
const sinon = require('sinon');
const BaseData = require('../../../data/base/base.data');

describe('BaseData.getAll()', () => {
    const db = {
        collection: () => {
        },
    };

    let animals = [];
    let ModelClass = null;
    const validator = null;
    let data = null;

    const toArray = () => {
        return Promise.resolve(animals);
    };

    const find = () => {
        return {
            toArray,
        };
    };

    describe('When there are animals in db', () => {
        describe('with default toViewModel', () => {
            beforeEach(() => {
                animals = ['dog', 'cat', 'dragon', 'horse'];
                sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { find };
                    });
                ModelClass = class {
                };

                // Arrange
                data = new BaseData(db, ModelClass, validator);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect to return animals', () => {
                return data.getAll()
                    .then((models) => {
                        expect(models).to.deep.equal(animals);
                    });
            });
        });

        describe('with custom toViewModel', () => {
            beforeEach(() => {
                animals = ['dog', 'cat', 'dragon', 'horse'];
                sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { find };
                    });
                ModelClass.toViewModel = (model) => {
                    return model + 's';
                };

                // Arrange
                data = new BaseData(db, ModelClass, validator);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect to return animals', () => {
                return data.getAll()
                    .then((models) => {
                        animals.forEach((animal) => {
                            const viewModel = animal + 's';
                            expect(models).to.contain(viewModel);
                        });
                    });
            });
        });
    });
});
