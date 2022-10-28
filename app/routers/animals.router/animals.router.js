const attachTo = (app, data) => {
    const controller = require('./animals.controller').init(data);

    app.get('/allAnimals', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        if (req.user.isAdmin === 'false') {
            return res.redirect('/notFound');
        }
        return next();
    }, (req, res) => {
        return controller.getAll(req, res);
    });

    app.get('/petsCare', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        return next();
    }, (req, res) => {
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

        return res.render('animals/petsCare', context);
    });

    app.put('/animals', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        return next();
    }, (req, res) => {
        const animal = req.body;
        return data.animals.updateAnimal(animal);
    });

    app.post('/animals', (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        return next();
    }, (req, res) => {
        if (!req.body.name.trim() ||
            req.body.name.trim().length < 1) {
            req.flash('info', 'Pet name must be entered!');
            return res.redirect('/profile');
        }
        if (!req.body.type.trim() ||
            req.body.type.trim().length < 1) {
            req.flash('info', 'Pet kind must be entered!');
            return res.redirect('/profile');
        }
        if (!req.body.breed.trim() ||
            req.body.breed.trim().length < 1) {
            req.flash('info', 'Pet breed must be entered!');
            return res.redirect('/profile');
        }
        if (!req.body.birthDate.trim() ||
            req.body.birthDate.trim().length < 10) {
            req.flash('info',
                'Pet birth date must be entered!');
            return res.redirect('/profile');
        }
        const animal = req.body;
        return data.animals.create(animal)
            .then((dbAnimal) => {
                return res.redirect('/profile');
            })
            .catch((err) => {
                return res.redirect('/profile');
            });
    });
};

module.exports = { attachTo };
