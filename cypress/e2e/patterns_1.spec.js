/// <reference types="cypress" />

context('Patterns - demo', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.on('uncaught:exception', (err, runnable) => {
            // Hydrate error is expected
            console.error(runnable, err);
            return false;
        });
    });
    it('Reload works', () => {
        cy.get('main section h3').contains('Demo').should('be.visible');
    });

    // TODO: Demo section check
});
