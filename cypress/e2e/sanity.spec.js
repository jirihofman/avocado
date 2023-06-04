/// <reference types="cypress" />

context('Sanity checks', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.on('uncaught:exception', (err, runnable) => {
            // Hydrate error is expected
            console.error(runnable, err);
            return false;
        });
    });
    it('Sections exist', () => {
        ['Demo', 'Plná verze'].forEach(header => {
            cy.get('main section h3').contains(header).should('be.visible');
        });
    });

    // TODO: Demo section check
});
