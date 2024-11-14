
import "./commands/loginCommands";
import "./commands/userDashboard";
import "./commands/sidePanelCommands";
import "./commands/deleteCommands";


afterEach(function () {
  const testTitle = this.currentTest?.title.replace(/ /g, "_"); 
  if (testTitle) {
    cy.screenshot(testTitle); 
  }
});
