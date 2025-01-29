/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      logMessage(message: string): Chainable<void>;
    }
  }
  
Cypress.Commands.add('logMessage', (message: string) => {
    cy.log(message);
});
