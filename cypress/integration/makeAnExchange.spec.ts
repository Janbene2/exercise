/// <reference types="cypress" />
// @ts-check
describe('Exchange', () => {
    let url = 'https://invity.io/';


    it('make an exchange', () => {
        cy.visit(url);
        cy.url().should('eq', url);
        cy.get('[href="/exchange-crypto"]').eq(0).click();
        cy.scrollTo(0,0);
        cy.findByLabelText('Crypto amount').type('10');
        cy.get('button[type="submit"]').click();
        cy.wait(5000);

        let bestOffer = cy.get('bg-success').parent('.accordion-item');
        cy.get(bestOffer + ' button').click();

        cy.get('button').contains('Continue to your address').click();
        cy.wait(5000);
        cy.get('h1').should('contain','So here\'s the deal...');
        cy.get('.col span').should('contain','LTC 10.0000');
    });
});