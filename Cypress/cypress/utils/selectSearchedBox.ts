export function selectSearchedBox(boxNumber: number, filedValue: string) {
  cy.get("i.oxd-icon.bi-caret-down-fill").eq(boxNumber).click();
  cy.get('div[role="listbox"]')
    .should("be.visible")
    .contains(filedValue)
    .click();
}
