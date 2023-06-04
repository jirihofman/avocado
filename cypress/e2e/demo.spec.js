/// <reference types="cypress" />

context('Demo', () => {
    before(() => {
        cy.visit('/');
        cy.on('uncaught:exception', (err, runnable) => {
            // Hydrate error is expected
            console.error(runnable, err);
            return false;
        });
    });
    // Skipped as all quizzes show immediately.
    it.skip('Sčítání', () => {
        cy.get('.btn.btn-outline-primary.btn-sm').first().click();
        cy.contains('button', '▶️').click();
        cy.contains('button', '🆗').should('be.disabled');
    });
});
