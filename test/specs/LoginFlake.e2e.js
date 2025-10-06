const LoginPage = require('../pageobjects/login.page')
const ProjectsPage = require('../pageobjects/projects.page')
const dataBuilder = require('../support/databuilder.js')

describe('My Login application', () => {
  
   it('should login with valid credentials', async () => {
       let credentials = await dataBuilder.getUserCredentials("user")

       await browser.url(`http://localhost:3000/#/login`)

       await LoginPage.emailInput.setValue(credentials.email)
       await LoginPage.passwordInput.setValue(credentials.password)
       await LoginPage.loginButton.click()

       const element = await ProjectsPage.cardTitle
       await expect(element).toHaveText('Hello')
   })

})