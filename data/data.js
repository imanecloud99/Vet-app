const AnimalsData = require('./animals.data');
const UsersData = require('./users.data');
const ChatsData = require('./chat.data');


const init = (db) => {
    return Promise.resolve({
        animals: new AnimalsData(db),
        users: new UsersData(db),
        chats: new ChatsData(db),
    });
};

module.exports = { init };
