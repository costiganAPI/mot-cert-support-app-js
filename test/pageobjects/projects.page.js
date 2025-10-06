const { $ } = require('@wdio/globals')
const Page = require('./page');

class ProjectsPage extends Page {
 
   get cardTitle() { return $('.card-title') }

}

module.exports = new ProjectsPage();