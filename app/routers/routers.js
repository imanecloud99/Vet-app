/* globals __dirname */

const path = require('path');
const fs = require('fs');

const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        let user = {};

        if (req.isAuthenticated()) {
            user = req.user;
            user.isAnonymous = false;
        } else {
            user.isAnonymous = true;
        }

        const context = {
            context: {
                user: user,
            },
        };
        return res.render('home', context);
    });

    app.get('/aboutUs', (req, res) => {
        let user = {};

        if (req.isAuthenticated()) {
            user = req.user;
            user.isAnonymous = false;
        } else {
            user.isAnonymous = true;
        }

        const context = {
            context: {
                user: user,
            },
        };
        return res.render('aboutUs', context);
    });

    app.get('/contactUs', (req, res) => {
        let user = {};

        if (req.isAuthenticated()) {
            user = req.user;
            user.isAnonymous = false;
        } else {
            user.isAnonymous = true;
        }

        const context = {
            context: {
                user: user,
            },
        };
        return res.render('contactUs', context);
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });

    app.get('*', (req, res) => {
        let user = {};

        if (req.isAuthenticated()) {
            user = req.user;
            user.isAnonymous = false;
        } else {
            user.isAnonymous = true;
        }

        const context = {
            context: {
                user: user,
            },
        };
        return res.render('notFound', context);
    });
};

module.exports = { attachTo };
