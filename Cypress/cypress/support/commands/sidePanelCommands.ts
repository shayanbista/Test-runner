import { InsertNameField } from "../../utils/inserNameFIeld";

// command to check the existing panel
Cypress.Commands.add("CheckPanelResult", () => {
  const menuItems = [
    "Admin",
    "PIM",
    "Leave",
    "Time",
    "Recruitment",
    "My Info",
    "Performance",
    "Dashboard",
    "Directory",
    "Maintenance",
    "Claim",
    "Buzz",
  ];

  const randomIndex = Math.floor(Math.random() * menuItems.length);
  const randomMenuItem = menuItems[randomIndex];

  InsertNameField(randomMenuItem, 0);
});


Cypress.Commands.add("EmptyPanelResult", () => {
  InsertNameField("money", 0);
});
