// commands.d.ts
declare namespace Cypress {
    interface Chainable<Subject = any> {
      deleteNonAdminUser(): Chainable<void>;
      login(credentials: { username: string; password: string }): Chainable<void>;
      assertErrorMessage(): Chainable<void>;
      assertInvalidCredentials(): Chainable<void>;
      checkDashboardVisibility(): Chainable<void>;
      CheckPanelResult(): Chainable<void>;
      EmptyPanelResult(): Chainable<void>; // Corrected typo
      getUserInputs(): Chainable<{ firstName: string; middleName: string; lastName: string }>;
      checkVisibility(): Chainable<void>;
      InsertValidUserInformation(data: string): Chainable<void>;
      InsertInvalidUserInformation(data: string): Chainable<void>;
    }
  }
  