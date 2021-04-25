/// <reference types="cypress" />

context('Sanity checks', () => {
	before(() => {
		cy.visit('/')
	})
	it('Header links', () => {
		['🏠', '🗒', '⚙️', 'GitHub', 'Copyright'].forEach(header => {
			cy.get('header ul li a').contains(header).should('be.visible');
		})
	})
	it('Sections exist', () => {
		['Demo', 'Plná verze'].forEach(header => {
			cy.get('main section h3').contains(header).should('be.visible');
		})
	})
})
