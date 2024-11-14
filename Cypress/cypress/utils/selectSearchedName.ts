export function waitForSearchToComplete(targetText: string) {
  cy.get('div[role="listbox"]').then(($div: JQuery<HTMLDivElement>) => {
    // Check if the text contains 'Searching....'
    if ($div.text().includes("Searching....")) {
      cy.wait(500);
      return waitForSearchToComplete(targetText);
    } else {
      cy.log("Final div text:", $div.text());
      if ($div.text().includes(targetText)) {
        cy.get('div[role="listbox"]').contains(targetText).click();
      } else {
        cy.log("Target text not found.");
      }
    }
  });
}
