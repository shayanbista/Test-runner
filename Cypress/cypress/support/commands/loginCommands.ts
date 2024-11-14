import { LoginData } from "../../types/login";
// externing a custom interface for login module
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(credentials: {
        username: string | "";
        password: string | "";
      }): Chainable<void>;
      assertErrorMessage(): Chainable<void>;
      assertInvalidCredentials(): Chainable<void>;
    }
  }
}

// command to handle the login module
Cypress.Commands.add(
  "login",
  (credentials: { username: string; password: string }) => {
    if (credentials.username.length > 0) {
      cy.get('input[name="username"]').type(credentials.username);
    }

    if (credentials.password.length > 0) {
      cy.get('input[name="password"]').type(credentials.password);
    }

    cy.get('button[type="submit"]').click();
  },
);

// command to display the error  message
Cypress.Commands.add("assertErrorMessage", () => {
  cy.get(".oxd-input-field-error-message")
    .should("be.visible")
    .and("contain", "Required");
});

// command to check the visibility
Cypress.Commands.add("checkDashboardVisibility", () => {
  cy.url().should("include", "/dashboard");
  cy.get(".oxd-topbar-header").should("be.visible");
});

// command to show invalid credentials
Cypress.Commands.add("assertInvalidCredentials", () => {
  cy.get('div[role="alert"]')
    .should("be.visible")
    .and("contain", "Invalid credentials");
});
