import React from 'react';
import Header from './header';

describe('<Header />', () => {
    describe('Mobile', () => {
        it('renders', () => {
            cy.viewport('iphone-se2');
            cy.mount(<Header />);
            cy.get('header').should('be.visible');
            ['Nastavení', 'GitHub', 'O Aplikaci'].forEach(header => {
                cy.get('header ul li a').contains(header).should('be.hidden');
            });
        });
    });
    describe('Desktop', () => {
        it('renders', () => {
            cy.viewport('macbook-11');
            cy.mount(<Header />);
            cy.get('header').should('be.visible');
            ['Nastavení', 'GitHub', 'O Aplikaci'].forEach(header => {
                cy.get('header ul li a').contains(header).should('be.visible');
            });
        });
    });
});
