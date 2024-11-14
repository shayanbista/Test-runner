import { clickTrashIcon } from "../../utils/selectTrashIcon";
// command to delte a non admin user
Cypress.Commands.add("deleteNonAdminUser", () => {
  let isDeleted = false;
  
  cy.get('div[role="row"]').then((rows: JQuery<HTMLElement>) => {
    if (rows.length === 2) {
      return; 
    } else {
      cy.get('div[role="row"]').each(($row: JQuery<HTMLElement>, index: number) => {
        if (index === 0 || isDeleted) {
          return;
        }
        cy.wrap($row)
          .find(".oxd-table-cell")
          .eq(1)
          .then(($cell: JQuery<HTMLElement>) => {
            if ($cell.text().trim() !== "Admin") {
              cy.wrap($row).find(".oxd-table-cell").eq(0).click();
              isDeleted = true; 
            } else {
              return; 
            }
          });
      });  
      cy.get(".bi-trash-fill").click();
      cy.get(".oxd-button--label-danger").last().click();
    }
  });
});

