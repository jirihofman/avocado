/// <reference types="cypress" />

context('Demo', () => {
	before(() => {
		cy.visit('/')
	})
	it('Sčítání', () => {
		cy.get('.btn.btn-outline-primary.btn-sm').first().click();
		cy.contains('Tabule je prázdná. Klikněte na tlačítko Začít.');
		cy.contains('button', 'Začít').click();
		cy.contains('button', 'Potvrdit').should('be.disabled');
	})
})
