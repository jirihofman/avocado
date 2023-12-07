import React from 'react';
import Question from './question';
import { demoIds } from '../lib/questions';

describe('<Question />', () => {

    it('add-1', () => {
    // see: https://on.cypress.io/mounting-react
        cy.mount(<Question demoId={'add-1'} subject={'math'} />);
    });

    it('dice-1', () => {
    // see: https://on.cypress.io/mounting-react
        cy.mount(<Question demoId={'dice-larger-1'} subject={'dice'} />);
    });

    describe('words-1', () => {
        it('wrong answer on 1st click', () => {
            cy.mount(<Question demoId={demoIds.WORDS_1} subject={'words'} />);
            // get first letter
            cy.get('.question-text button').first().then((button) => {
                const firstLetter = button.text();
                cy.log('firstLetter', firstLetter);
                // click wrong option
                cy.get('.question-btn').not(`:contains(${firstLetter})`).first().click();
                // should be red
                cy.get('.question-btn').not(`:contains(${firstLetter})`).first().should('have.class', 'btn-outline-danger');
                // click correct option
                cy.get('.question-btn').contains(firstLetter).should('be.disabled');
            });
        });
    });

    describe('patterns-1', () => {
        it('reload', () => {
            cy.mount(<Question demoId={demoIds.PATTERNS_1} subject={'patterns'} />);
            // get first letter
            cy.get('button.btn.btn-outline-primary.btn-lg.w-50').click();
        });
    });
});
