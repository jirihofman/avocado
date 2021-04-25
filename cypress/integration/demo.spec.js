/// <reference types="cypress" />

context('Demo', () => {
	before(() => {
		cy.visit('/')
	})
	it('Sčítání', () => {
		cy.get('.demo-category-link').first().click();
		cy.contains('Tabule je prázdná. Klikněte na tlačítko Začít.');
		cy.contains('button', 'Začít').click();
		cy.contains('button', 'Potvrdit').should('be.disabled');
	})
})
