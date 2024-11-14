import { userName } from "../../types/user";
import { InsertNameField } from "../../utils/inserNameFIeld";
import { selectSearchedBox } from "../../utils/selectSearchedBox";
import { waitForSearchToComplete } from "../../utils/selectSearchedName";

// command to hanle user input
Cypress.Commands.add("getUserInputs", () => {
  const userInputs = {
    firstName: "",
    middleName: "",
    lastName: "",
  };
  cy.get('input[name="firstName"]')
    .invoke("val")
    .then((val: string) => {
      userInputs.firstName = val;
      console.log("value of first name", val);
    });
  cy.get('input[name="middleName"]')
    .invoke("val")
    .then((val: string) => {
      userInputs.middleName = val;
    });
  cy.get('input[name="lastName"]')
    .invoke("val")
    .then((val: string) => {
      userInputs.lastName = val;
    });

  return cy.wrap(userInputs);
});

// command to check visibility
Cypress.Commands.add("checkVisibility", () => {
  cy.get(".oxd-loading-spinner", { timeout: 10000 }).should("not.exist");
  cy.get(".orangehrm-background-container").should("be.visible");
});

// command to handle valid userInformation
Cypress.Commands.add("InsertValidUserInformation", (data: string) => {
  cy.get('input[placeholder="Type for hints..."]').type(data);
  waitForSearchToComplete(data);
  selectSearchedBox(1, "Admin");
  selectSearchedBox(2, "Enabled");
  cy.contains("button", "Search").click();
});

// command to handle invalid userInformation
Cypress.Commands.add("InsertInvalidUserInformation", (data: string) => {
  cy.get('input[placeholder="Type for hints..."]').type(data);
  waitForSearchToComplete(data);
  selectSearchedBox(1, "ESS");
  selectSearchedBox(2, "Enabled");
  InsertNameField("Admin", 1);
  cy.contains("button", "Search").click();
  cy.get("#oxd-toaster_1").should("be.visible");
});
