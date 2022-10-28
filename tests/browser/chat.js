/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const loginUtils = require('./utils/login.utils');
const registerUtils = require('./utils/register.utils');
const async = require('../../common/async');

describe('In Chat page', () => {
    let driver = null;
    const appUrl = 'http://localhost:3002';
    const fullName = 'Pesho Peshev';
    const username = 'Peshistiya';
    const email = 'someone@some.where';
    const pass = '123456';
    const phone = '02 555 555';
    const address = '1 Osogovo Str';

    before(() => {
        async()
            .then(() => {
                return registerUtils
                    .register(username, fullName, email, pass, phone, address);
            });
    });

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
        return driver.get(appUrl);
    });

    afterEach(() => {
        driver.quit();
    });

    describe('when the page is loaded', (done) => {
        beforeEach(() => {
            async()
                .then(() => {
                    return loginUtils.login(username, pass);
                });
        });

        it('expect a button for sending message to be visible', () => {
            return async()
                .then(() => ui.click('#nav-btn-chat'))
                .then(() => ui.getText('#sendBtn'))
                .then((btnText) => {
                    expect(btnText).to.contain('Send');
                });
        });

        it('expect when user enter a message and click on send button,' +
            ' the message to appear in the chat', () => {
            const msg = 'Hello, World!';

            return async()
                .then(() => ui.click('#nav-btn-chat'))
                .then(() => ui.setValue('#sendText', msg))
                .then(() => ui.click('#sendBtn'))
                .then(() => ui.getText('#chat div:last-of-type>span'))
                .then((text) => {
                    expect(text).to.equal(msg);
                });
        });

        it('expect when user write a message in the chat,' +
            ' the username to be shown with the message', () => {
            const msg = 'Hello, World!';

            return async()
                .then(() => ui.click('#nav-btn-chat'))
                .then(() => ui.setValue('#sendText', msg))
                .then(() => ui.click('#sendBtn'))
                .then(() => ui.getText('#chat div:last-of-type>p'))
                .then((text) => {
                    expect(text).to.contain(username);
                });
        });
    });
});
