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
    it('Header links', () => {
        ['Blog', 'Nastavení', 'GitHub', 'O Aplikaci'].forEach(header => {
            cy.get('header ul li a').contains(header).should('be.visible');
        });
    });
    it('Sections exist', () => {
        ['Demo', 'Plná verze'].forEach(header => {
            cy.get('main section h3').contains(header).should('be.visible');
        });
    });

    // TODO: Demo section check
});
