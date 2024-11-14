export function clickTrashIcon(trashIcons: JQuery<HTMLElement>, index: number) {
  cy.wrap(trashIcons).eq(index).click();
}
