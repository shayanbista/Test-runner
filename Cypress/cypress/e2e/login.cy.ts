import { LoginData} from "../types/login";

describe("User Login", () => {
  let testData: {
    validUser: LoginData["validUser"];
    invalidUser: LoginData["invalidUser"];
    emptyUser: LoginData["emptyUser"];
    partialUser: LoginData["partialUser"];
  };

  before(() => {
    cy.fixture("login.json").then((data: LoginData) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  });

  it("should login with valid credentials", () => {
    cy.login(testData.validUser);
    cy.checkDashboardVisibility();
  });
  it("should fail login with invalid credentials", () => {
    cy.login(testData.invalidUser);
    cy.assertInvalidCredentials();
  });

  it("should show Required on empty  fields", () => {
    cy.login(testData.emptyUser);
    cy.assertErrorMessage();
  });

  it("should show Required on not provided field", () => {
    cy.login(testData.partialUser);
    cy.assertErrorMessage();
  });
});
