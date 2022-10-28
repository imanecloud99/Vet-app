let driver = null;

const ui = require('./ui');
const async = require('../../../common/async');

const register = (username, fullName, email, pass, phone, address) => {
    return async()
        .then(() => ui.click('#nav-btn-register'))
        .then(() => ui.setValue('input[name="username"]', username))
        .then(() => ui.setValue('input[name="fullName"]', fullName))
        .then(() => ui.setValue('input[name="email"]', email))
        .then(() => ui.setValue('input[name="password"]', pass))
        .then(() => ui.setValue('input[name="phone"]', phone))
        .then(() => ui.setValue('input[name="address"]', address))
        .then(() => ui.click('input[name="acceptPolicy"]'))
        .then(() => ui.click('button[type="submit"]'));
};

module.exports = {
    setDriver(_driver) {
        driver = _driver;
        ui.setDriver(driver);
    },

    register,
};
