// This file runs before all Cypress tests
import './command';

// You can add global configurations here
Cypress.on('uncaught:exception', (err, runnable) => {
    return false; // Prevents Cypress from failing tests due to uncaught exceptions
});
