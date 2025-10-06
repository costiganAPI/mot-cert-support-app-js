const { browser } = require('@wdio/globals');

class Page {
    open(path) {
        return browser.url(`https://the-internet.herokuapp.com/${path}`);
    }
}

module.exports = Page;

