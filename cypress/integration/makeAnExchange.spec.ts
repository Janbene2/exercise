/// <reference types="cypress" />
// @ts-check


/*
Steps:
1. navigate to the Invity web
2. verify that you’re indeed on a correct url (https://invity.io/)
3. navigate to `Exchange crypto` page
4. fill in the exchange form in order to change `10 LTC` to `BTC`
5. click on `Compare offers`
6. wait for the offers to appear
7. select the row containing `  Best deal` label and click on `Get this deal`
8. verify that you’re on the page containing `So here's the deal`
9. verify that the `LTC` amount in the header of the page is indeed set to `10`
---
1. OK
2. OK
3. OK
4. NOK - chybi vyplneni castky ke smene
5. NOK - kvuli predchozimu kroku je tlacitko disabled, a proto na nej nejde kliknout
6. NOK - staticke cekani tady neni vhodne, ceka se na odpoved tretich stran, ktere muze trvat i dele
7. NOK - logika kliknuti na "get the best deal" nemuze fungovat
8. OK
9. NOK - selektor je prilis obecny

Shrnuti:
 - test neprosel kvuli chybjejicimu kroku zadani castky. Problem je v neunikatnosti vysledku, ne ve scrollovani aplikace (to je tam ale taky). To se da obejit bud force clickem, nastavenim vetsiho viewportu anebo upravou scrollBehavior
 - Command 'findByLabelText':
   - kvuli prilis obecnemu zacileni se pak kombinatorika vymkne kontrole a hledany text se tak nenajde.
   V tehle konkretni situaci by stacilo upravit selektor na 'input[required]', aby byl unikatni.
*/

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

        // tahle logika je v cypressu anti-pattern, spravne se ma pouzit callback
        let bestOffer = cy.get('bg-success').parent('.accordion-item');
        // I kdyby logika o radek vyse fungovala, nejsem si jisty, co by mel tento radek delat. Spojit DOM element (ktery vraci cy.get ) se stringem?
        cy.get(bestOffer + ' button').click();

        cy.get('button').contains('Continue to your address').click();
        // dalsi staticky wait, chtel bych tady videt nejaky dynamicky
        cy.wait(5000);
        cy.get('h1').should('contain','So here\'s the deal...');
        cy.get('.col span').should('contain','LTC 10.0000');
    });
});
