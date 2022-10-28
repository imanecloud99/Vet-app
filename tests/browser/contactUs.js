/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const ui = require('./utils/ui');
const async = require('../../common/async');

describe('In Contact Us page', () => {
    let driver = null;
    const appUrl = 'http://localhost:3002';

    describe('when the page is loaded', (done) => {
        beforeEach(() => {
            driver = setupDriver('chrome');
            ui.setDriver(driver);
            return driver.get(appUrl);
        });

        afterEach(() => {
            driver.quit();
        });

        it('expect page heading with text "Our location"', () => {
            ui.click('#nav-btn-contactUs')
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('h1')
                    );
                })
                .then((el) => {
                    return el.getText();
                })
                .then((text) => {
                    expect(text).to.contain('Our location');
                });
        });

        it('expect a map showing location of the clinic', () => {
            return async()
                .then(() => ui.click('#nav-btn-contactUs'))
                .then(() => ui.waitFor('iframe'))
                .then((el) => {
                    expect(el).to.exist;
                });
        });
    });
});
