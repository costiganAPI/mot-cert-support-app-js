const { $ } = require('@wdio/globals')
const Page = require('./page');

class LoginPage extends Page {
 
   get emailInput() { return $('input[name="email"]') }
   get passwordInput() { return $('input[name="password"]') }
   get loginButton() { return $('button') }

}

module.exports = new LoginPage();