class User {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.username === 'string' &&
            model.username.length > 3;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new User();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = User;
