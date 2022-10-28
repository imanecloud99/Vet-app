const passport = require('passport');

const attachTo = (app, data) => {
    const usersController = require('./users.controller').init(data);

    app.get('/chat', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        return next();
    }, (req, res) => {
        return data.chats.getAll()
            .then((chats) => {
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
                        chats: chats,
                    },
                };
                return res.render('chat', context);
            });
    });

    app.get('/login', (req, res) => {
        const context = {
            user: {
                isAnonymous: true,
            },
        };
        return res.render('users/login', { context: context });
    });

    app.get('/register', (req, res) => {
        const context = {
            user: {
                isAnonymous: true,
            },
        };
        return res.render('users/register', { context: context });
    });

    app.get('/profile', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        return next();
    }, (req, res) => {
        return usersController.getUser(req, res);
    });

    app.put('/profile', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        return next();
    }, (req, res) => {
        const user = req.body;
        return data.users.updateUser(user);
    });

    app.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true,
        }),
        (req, res) => {
            res.redirect('/profile');
        }
    );

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.post('/register', (req, res, next) => {
        if (!req.body.username.trim() ||
            req.body.username.trim().length < 5) {
            req.flash('info', 'Username must be at least 5 characters long!');
            return res.redirect('/register');
        }
        if (!req.body.fullName.trim() ||
            req.body.fullName.trim().length < 10) {
            req.flash('info', 'Full name must be at least 10 characters long!');
            return res.redirect('/register');
        }
        if (!req.body.password.trim() ||
            req.body.password.trim().length < 5) {
            req.flash('info', 'Password must be at least 5 characters long!');
            return res.redirect('/register');
        }
        if (!req.body.email.trim() ||
            req.body.email.trim().length < 10) {
            req.flash('info', 'Email must be at least 10 characters long!');
            return res.redirect('/register');
        }
        if (!req.body.phone.trim() ||
            req.body.phone.trim().length < 10) {
            req.flash('info', 'Phone must be at least 10 characters long!');
            return res.redirect('/register');
        }
        if (!req.body.address.trim() ||
            req.body.address.trim().length < 10) {
            req.flash('info', 'Address must be at least 10 characters long!');
            return res.redirect('/register');
        }

        const user = req.body;
        return data.users.create(user)
            .then((dbUser) => {
                return req.login(dbUser, (er) => {
                    if (er) {
                        return next(er);
                    }
                    return usersController.getUser(req, res);
                });
            })
            .catch(() => {
                req.flash('info', 'Username already exists! ' +
                    'Please try another one :)');
                res.redirect('/register');
            });
    });
};

module.exports = { attachTo };
