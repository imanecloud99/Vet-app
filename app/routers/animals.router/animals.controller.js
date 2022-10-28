const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.animals.getAll()
                .then((animals) => {
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
                            animals: animals,
                        },
                    };
                    return res.render('animals/allAnimals', context);
                });
        },
        getAnimalsByOwnerUsername(username) {
            return data.animals.getAnimalsByOwnerUsername(username);
        },
    };

    return controller;
};


module.exports = { init };
