export function InsertNameField(name: string, boxField: number): void {
  cy.get(".oxd-input--active")
    .eq(boxField)
    .should("be.visible")
    .click()
    .type(name);
}
