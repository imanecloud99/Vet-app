const BaseData = require('./base/base.data');
const Chat = require('../models/chat.model');

class ChatsData extends BaseData {
    constructor(db) {
        super(db, Chat, Chat);
    }

    addMessage(message, keyword) {
        return this.collection.findOne({ 'groupChat': keyword })
            .then((messages) => {
                if (!messages) {
                    return this.collection.insertOne({
                        'groupChat': keyword,
                        'messages': [],
                    });
                }
                return true;
            })
            .then(() => {
                this.collection.updateOne(
                    { 'groupChat': keyword }, {
                        $push: {
                            messages: message,
                        },
                    }).catch((err) => {
                    return err;
                });
            });
    }
}

module.exports = ChatsData;
