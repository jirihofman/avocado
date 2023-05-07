/// <reference types="cypress" />

context('Demo', () => {
    before(() => {
        cy.visit('/');
    });
    it('Sčítání', () => {
        cy.get('.btn.btn-outline-primary.btn-sm').first().click();
        cy.contains('button', '▶️').click();
        cy.contains('button', '🆗').should('be.disabled');
    });
});
