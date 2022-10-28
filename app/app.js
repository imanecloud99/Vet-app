const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const messages = require('express-messages');

const init = (data) => {
    /* eslint-disable */
    const app = express();
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    /* eslint-enable */

    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/libs', express.static('./node_modules'));
    app.use('/static', express.static('./static'));
    app.use(cookieParser('keyboard cat'));
    app.use(flash());

    app.use((req, res, next) => {
        res.locals.messages = messages(req, res);
        next();
    });

    require('../config/auth.config').init(app, data);
    app.use((req, res, next) => {
        next();
    });

    require('./routers')
        .attachTo(app, data);

    const message = {
        user: '',
        text: '',
        date: '',
    };

    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
            message.user = msg.user;
            message.date = msg.date;
            message.text = msg.message;

            if (msg.message.trim().length > 0) {
                data.chats.addMessage(message, 'petVet');
            }
            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
        });
    });

    return Promise.resolve(server);
};

module.exports = {
    init,
};
