const init = (data) => {
    const controller = {
        getUser(req, res) {
            const animalsController =
                require('../animals.router/animals.controller').init(data);

            return data.users.findById(req.user._id)
                .then((user) => {
                    user.isAnonymous = false;
                    return animalsController.
                    getAnimalsByOwnerUsername(user.username)
                        .then((animals) => {
                            return res.render('users/profile', {
                                context: {
                                    user: user,
                                    animals: animals,
                                },
                            });
                        });
                });
        },
    };

    return controller;
};

module.exports = { init };
