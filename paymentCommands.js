import { getTestCreditCard } from '../utils/ccUtil';
Cypress.Commands.add('addRandomCard', () => {
  cy.getWithinIframe('[name="cardnumber"]', {
    timeout: 5000
  }).type(getTestCreditCard(), { force: true }); //Card Number field
  //Card Number field
  cy.get('[name="ccInformation.nameOnCard"]') //Name on Card field
    .focus()
    .clear({ force: true })
    .type('Automation ')
    .type('Renter');
  cy.get('[class="__PrivateStripeElement"]')
    .eq(1)
    .within(() => {
      cy.getWithinIframe('[name="exp-date"]').type('1232'); // EXP Date field
    });
  cy.get('[class="__PrivateStripeElement"]')
    .eq(2)
    .within(() => {
      cy.getWithinIframe('[name="cvc"]').type('9871'); // CVV field
    });
  cy.get('[name="ccInformation.zipCode"]')
    .clear({ force: true })
    .type('78701'); // ZIP CODE field
  cy.get('[class*="switch MuiSwitch-sizeSmall"]').click(); //SAVE CARD
});
Cypress.Commands.add('addRandomCardNoSave', () => {
  cy.getWithinIframe('[name="cardnumber"]', {
    timeout: 5000
  }).type(getTestCreditCard(), { force: true }); //Card Number field
  //Card Number field
  cy.get('[name="ccInformation.nameOnCard"]') //Name on Card field
    .focus()
    .clear({ force: true })
    .type('Automation ')
    .type('Renter');
  cy.get('[class="__PrivateStripeElement"]')
    .eq(1)
    .within(() => {
      cy.getWithinIframe('[name="exp-date"]').type('1232'); // EXP Date field
    });
  cy.get('[class="__PrivateStripeElement"]')
    .eq(2)
    .within(() => {
      cy.getWithinIframe('[name="cvc"]').type('9871'); // CVV field
    });
  cy.get('[name="ccInformation.zipCode"]')
    .clear({ force: true })
    .type('78701'); // ZIP CODE field
  //cy.get('[class*="switch MuiSwitch-sizeSmall"]').click(); //SAVE CARD
});
Cypress.Commands.add('recommendedCard', () => {
  cy.get('[class*="__select-card-field"]').click();
  cy.get('[class*="__cards-container"]').within(() => {
    cy.contains('(recommended)').click({ force: true });
  });
});
Cypress.Commands.add('addRandomCardGroupLeader', () => {
  cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
    .eq(6) //Payment Card
    .within(() => {
      //cy.contains('CARD NUMBER').highlight().pause() // FINDS IT
      cy.getWithinIframe('[name="cardnumber"]')
        //.type('4242424242424242', { timeout: 5000 }) //Card Number field
        .type(getTestCreditCard(), { force: true }) //Card Number field
        .wait(500);
      cy.get('[name="ccInformation.nameOnCard"]') //Name on Card field
        .focus()
        .clear({ force: true })
        .type('Automation ')
        .type('Renter');
      cy.get('[class="__PrivateStripeElement"]')
        .eq(1)
        .within(() => {
          cy.getWithinIframe('[name="exp-date"]').type('1232'); // EXP Date field
        });
      cy.get('[class="__PrivateStripeElement"]')
        .eq(2)
        .within(() => {
          cy.getWithinIframe('[name="cvc"]').type('9871'); // CVV field
        });
      cy.get('[name="ccInformation.zipCode"]')
        .clear({ force: true })
        .type('78701'); // ZIP CODE field
      //cy.get('[class*="switch MuiSwitch-sizeSmall"]').click(); //SAVE CARD
      cy.get('[class="MuiButton-label"]')
        .contains('CHARGE')
        .click({ force: true });
    });
});
Cypress.Commands.add('processCC', () => {
  cy.get('[class="MuiInputBase-input MuiFilledInput-input MuiInputBase-inputAdornedEnd MuiFilledInput-inputAdornedEnd"]').click({ force: true });
  cy.get('[class*="MuiFilledInput-inputAdornedEnd"]').click({ force: true });
  cy.get('[class*="__card-field"]').then($existingCards => {
    if ($existingCards.text().includes('****')) {
      cy.contains('****')
        .eq(0)
        .click({ force: true });
    } else {
      cy.contains('ADD A NEW CARD')
        .click({ force: true })
        .wait(1500);
      cy.addRandomCard();
    }
  });
});
Cypress.Commands.add('processCCupCharge', () => {
  //Payment details
  cy.get('[class="MuiInputBase-input MuiFilledInput-input MuiInputBase-inputAdornedEnd MuiFilledInput-inputAdornedEnd"]').click({ force: true });
  cy.get('[class*="MuiFilledInput-inputAdornedEnd"]').click({ force: true });
  cy.get('[class*="__card-field"]').then($existingCards => {
    if ($existingCards.text().includes('****')) {
      cy.contains('****')
        .eq(0)
        .click({ force: true });
    } else {
      //cy.contains('ADD A NEW CARD')
      cy.get('[class="InputElement is-empty Input Input--empty"]')
        .click({ force: true })
        .wait(1500);
      cy.addRandomCard();
    }
  });
});
Cypress.Commands.add('renterCC', () => {
  //Payment details
  cy.get('[class="MuiInputBase-input MuiFilledInput-input MuiInputBase-inputAdornedEnd MuiFilledInput-inputAdornedEnd"]').click({ force: true });
  cy.get('[class*="MuiFilledInput-inputAdornedEnd"]').click({ force: true });
  cy.wait(1000);
  cy.get('[class*="__card-field "]', { timeout: 10000 })
    .eq(0)
    .click(); //ADD A NEW  CARD
  cy.wait(500);
});
