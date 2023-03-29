/// <reference types="cypress" />
import { getConstants } from '../../../../fixtures/getConstants';

import { getTestCreditCard } from '../../../../utils/ccUtil';
const moment = require('moment');

describe('venueAdminBookStallRVAddOns-YesterdayToToday-Group', () => {
  beforeEach('Login', function() {
    // Login as venue admin
    cy.venueAdminLogin(getConstants({ timeout: 10000 }));
  });
  afterEach(() => {
    cy.logout();
    cy.reload({ force: true });
  });
  // **** THIS SECTION SETS THE DATES FROM CURRENT TO +x IN THE FUTURE ************
  var myStartDate = moment()
    .subtract(1, 'd')
    .format('MM/DD/YY');
  var myCurrentDate = moment().format('MM/DD/YY');
  var valMyStartDate = moment().format('MM/DD/YY');
  var valMyCurrentDate = moment().format('MM/DD/YY');
  var myNoteDate = moment().format('MMMM Do YYYY, h:mm:ss a');
  // *************************** END OF DATE SET  *********************************

  //Login
  it('1-Logs in as Venue admin, books Stalls, RV Spots & Add Ons (Yesterday to Today). Edit count of all & cancels', () => {
    cy.venueadmin();
    cy.contains('CREATE NEW').click();
    cy.get('[name="renterInformation.email"]')
      .click()
      .type('auto');
    cy.contains('[REDACTED]').click();
    //Search for and select event
    cy.get('[id="mui-component-select-EVENT"]').click();
    cy.contains('Automation Venue Test Event').click({ force: true });

    //Enable Stalls Toggle
    const stallsToggle = cy.get('[class="MuiSwitch-root"]');
    stallsToggle.eq(0).click();
    //Stalls Section
    cy.get('[name="stalls.quantity"]').type(1);

    // ****************** SETS THE DATES ************************
    cy.get('[name="start"]').type(myStartDate, { force: true });
    cy.get('[data-testid="back-date-modal"]').within(() => {
      cy.contains('Previous Date Selected');
      cy.contains('You selected a date that is in the past, do you want to continue with this selection?');
      cy.wait(1000);
      cy.get('[data-testid="back-date-modal-cancel"]').click({ force: true });
    });
    cy.get('[name="start"]').type(myStartDate, { force: true });
    cy.get('[data-testid="back-date-modal"]').within(() => {
      cy.contains('Previous Date Selected', { timeout: 500 });
      cy.contains('You selected a date that is in the past, do you want to continue with this selection?');
      cy.wait(1000);
      cy.get('[data-testid="back-date-modal-continue"]', { timeout: 5500 }).click({ force: true });
    });
    cy.get('[name="end"]').type(myCurrentDate, { force: true });
    // ************************************************************

    //Click SELECT for stall rate
    cy.selectStallRate();
    cy.stallMap_SelectSpot();
    cy.adminStallQuestions();

    // ADD ONS
    //Enable Add Ons Toggle
    const addOnsToggle = cy.get('[class="MuiSwitch-root"]');
    addOnsToggle.eq(2).click();
    cy.get('[data-testid="card_addOnProduct"]').within(() => {
      // ******** Ad Ons are set to (2) each
      // FIRST ADD ON
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(0) //1st input field
        .focus()
        .type('150') // INPUT FIELD
        .get('[data-testid*="additive-input-plus"]')
        .eq(0)
        .click({ force: true }); //UP ARROW
      cy.contains('Maximum exceeded');
      cy.wait(1000);
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(0) // Minus button. Value = 150
        .click();
      cy.wait(1000);
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(0)
        .focus()
        .type('{backspace}')
        .type('{backspace}')
        .type('{backspace}') // VALUE IS 1
        .get('[data-testid*="additive-input-plus"]')
        .eq(0)
        .click({ force: true }); //UP ARROW. Value = 2

      // SECOND ADD ON
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(1) //2nd input field
        .focus()
        .type('150') // INPUT FIELD
        .get('[data-testid*="additive-input-plus"]')
        .eq(1)
        .click({ force: true }); //UP ARROW
      cy.contains('Maximum exceeded');
      cy.wait(1000);
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(1) // Minus button. Value = 150
        .click();
      cy.wait(1000);
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(1)
        .focus()
        .type('{backspace}')
        .type('{backspace}')
        .type('{backspace}') // VALUE IS 1
        .get('[data-testid*="additive-input-plus"]')
        .eq(1)
        .click({ force: true }); //UP ARROW. Value = 2

      // THIRD ADD ON
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(2) //3rd input field
        .focus()
        .type('150') // INPUT FIELD
        .get('[data-testid*="additive-input-plus"]')
        .eq(2)
        .click({ force: true }); //UP ARROW
      cy.contains('Maximum exceeded');
      cy.wait(1000);
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(2) // Minus button. Value = 150
        .click();
      cy.wait(1000);
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(2)
        .focus()
        .type('{backspace}')
        .type('{backspace}')
        .type('{backspace}') // VALUE IS 1
        .get('[data-testid*="additive-input-plus"]')
        .eq(2)
        .click({ force: true }); //UP ARROW. Value = 2})
    });
    //RVs
    //Enable Spots Toggle
    const rvToggle = cy.get('[class="MuiSwitch-root"]');
    rvToggle.eq(1).click();
    cy.wait(500);
    cy.adminRVQuestions().wait(500);
    cy.get('[name="rv_spot.quantity"]')
      .focus()
      .type(1, { force: true });

    // Select RV Lot
    cy.selectRVRate();
    cy.wait(2500);
    cy.rvMap_SelectSpot({ timeout: 5500 });

    cy.adminNotesCreateRes();
    // SPECIAL REQUESTS
    cy.adminSpecialRequests();
    cy.wait(500);

    //Payment details
    //DEFERRED:
    cy.get('[id="radio-deferred-payment"]').click(); //Group Bill
    cy.get('[id="mui-component-select-GROUP NAME"]').click({ force: true }); //Group field
    cy.contains('Automation Group').click({ force: true });

    cy.contains('REVIEW & SAVE').click();

    // CLICK EDIT BUTTON
    cy.get('[data-testid="review-and-save-edit-button"]').click();

    //Re-select Stalls
    cy.get('[name="stalls.quantity"]')
      .clear()
      .type(1);
    cy.selectStallRate();
    cy.stallMap_SelectSpot();

    //Re-select RVs
    cy.get('[name="rv_spot.quantity"]')
      .clear()
      .type(1);
    // Select RV Lot
    cy.selectRVRate();
    cy.wait(2500);
    cy.rvMap_SelectSpot({ timeout: 5500 });

    // ******** Ad Ons
    // FIRST ADD ON
    cy.get('[data-testid*="additive-input-minus"]')
      .eq(0) // Minus button
      .click();
    cy.wait(1000);

    // SECOND ADD ON
    cy.get('[data-testid*="additive-input-minus"]')
      .eq(1) // Minus button
      .click();
    cy.wait(1000);

    // THIRD ADD ON
    cy.get('[data-testid*="additive-input-minus"]')
      .eq(2) // Minus button
      .click();
    cy.wait(1000);

    cy.contains('REVIEW & SAVE').click();

    //VALIDATE ORDER SUMMARY
    cy.get('*[class^="MuiPaper-root MuiCard-root"]')
      .eq(7)
      .within(() => {
        cy.contains(valMyStartDate);
        cy.contains('Reserved');
        cy.contains(' RV Lot');
        cy.contains(valMyCurrentDate);
      });

    // CLICK EDIT BUTTON
    cy.get('[data-testid="review-and-save-edit-button"]').click();
    cy.wait(1000);
  });
  it('2-Logs in as Venue admin, books Stalls, RV Spots & Add Ons (Yesterday to Today). Edit count of all & Saves (no print)', () => {
    cy.venueadmin();
    cy.contains('CREATE NEW').click();
    cy.get('[name="renterInformation.email"]')
      .click()
      .type('auto');
    cy.contains('[REDACTED]').click();
    //Search for and select event
    cy.get('[id="mui-component-select-EVENT"]').click();
    cy.contains('Automation Venue Test Event').click({ force: true });

    //Enable Stalls Toggle
    const stallsToggle = cy.get('[class="MuiSwitch-root"]');
    stallsToggle.eq(0).click();
    //Stalls Section
    cy.get('[name="stalls.quantity"]').type(1);

    // ****************** SETS THE DATES ************************
    cy.get('[name="start"]').type(myStartDate, { force: true });
    cy.get('[data-testid="back-date-modal"]').within(() => {
      cy.contains('Previous Date Selected');
      cy.contains('You selected a date that is in the past, do you want to continue with this selection?');
      cy.wait(1000);
      cy.get('[data-testid="back-date-modal-cancel"]').click({ force: true });
    });
    cy.get('[name="start"]').type(myStartDate, { force: true });
    cy.get('[data-testid="back-date-modal"]').within(() => {
      cy.contains('Previous Date Selected', { timeout: 500 });
      cy.contains('You selected a date that is in the past, do you want to continue with this selection?');
      cy.wait(1000);
      cy.get('[data-testid="back-date-modal-continue"]', { timeout: 5500 }).click({ force: true });
    });
    cy.get('[name="end"]').type(myCurrentDate, { force: true });
    // ************************************************************

    //Click SELECT for stall rate
    cy.selectStallRate();
    cy.stallMap_SelectSpot();
    cy.adminStallQuestions();

    // ADD ONS
    //Enable Add Ons Toggle
    const addOnsToggle = cy.get('[class="MuiSwitch-root"]');
    addOnsToggle.eq(2).click();
    cy.get('[data-testid="card_addOnProduct"]').within(() => {
      // ******** Ad Ons are set to (2) each
      // FIRST ADD ON
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(0) //1st input field
        .focus()
        .type('150') // INPUT FIELD
        .get('[data-testid*="additive-input-plus"]')
        .eq(0)
        .click({ force: true }); //UP ARROW
      cy.contains('Maximum exceeded');
      cy.wait(1000);
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(0) // Minus button. Value = 150
        .click();
      cy.wait(1000);
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(0)
        .focus()
        .type('{backspace}')
        .type('{backspace}')
        .type('{backspace}') // VALUE IS 1
        .get('[data-testid*="additive-input-plus"]')
        .eq(0)
        .click({ force: true }); //UP ARROW. Value = 2

      // SECOND ADD ON
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(1) //2nd input field
        .focus()
        .type('150') // INPUT FIELD
        .get('[data-testid*="additive-input-plus"]')
        .eq(1)
        .click({ force: true }); //UP ARROW
      cy.contains('Maximum exceeded');
      cy.wait(1000);
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(1) // Minus button. Value = 150
        .click();
      cy.wait(1000);
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(1)
        .focus()
        .type('{backspace}')
        .type('{backspace}')
        .type('{backspace}') // VALUE IS 1
        .get('[data-testid*="additive-input-plus"]')
        .eq(1)
        .click({ force: true }); //UP ARROW. Value = 2

      // THIRD ADD ON
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(2) //3rd input field
        .focus()
        .type('150') // INPUT FIELD
        .get('[data-testid*="additive-input-plus"]')
        .eq(2)
        .click({ force: true }); //UP ARROW
      cy.contains('Maximum exceeded');
      cy.wait(1000);
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(2) // Minus button. Value = 150
        .click();
      cy.wait(1000);
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .eq(2)
        .focus()
        .type('{backspace}')
        .type('{backspace}')
        .type('{backspace}') // VALUE IS 1
        .get('[data-testid*="additive-input-plus"]')
        .eq(2)
        .click({ force: true }); //UP ARROW. Value = 2})
    });
    //RVs
    //Enable Spots Toggle
    const rvToggle = cy.get('[class="MuiSwitch-root"]');
    rvToggle.eq(1).click();
    cy.wait(500);
    cy.adminRVQuestions().wait(500);
    cy.get('[data-testid="card_rvProduct"]', { timeout: 1500 }) //RV SECTION
      .within(() => {
        cy.get('[class="back-date-warning"]')
          //.eq(1)
          .contains('Reservation includes a past date');
        cy.get('[name="rv_spot.quantity"]')
          .focus()
          .type(1, { force: true });
      });
    // Select RV Lot
    cy.selectRVRate();
    cy.wait(2500);
    cy.rvMap_SelectSpot({ timeout: 5500 });

    cy.adminNotesCreateRes();
    // SPECIAL REQUESTS
    cy.adminSpecialRequests();
    cy.wait(500);

    //Payment Details
    //DEFERRED:
    cy.get('[id="radio-deferred-payment"]').click(); //Group Bill
    cy.get('[id="mui-component-select-GROUP NAME"]')
      .click({ force: true }) //Group field
      .wait(1500);
    cy.contains('Automation Group').click({ force: true });

    cy.contains('REVIEW & SAVE').click();

    // CLICK EDIT BUTTON
    cy.get('[data-testid="review-and-save-edit-button"]').click();

    //Re-select Stalls
    cy.get('[name="stalls.quantity"]')
      .clear()
      .type(1);

    // Select RV Lot
    cy.selectStallRate();
    cy.wait(2500);
    cy.stallMap_SelectSpot({ timeout: 5500 });

    // Select RV Lot
    cy.selectRVRate();
    cy.wait(2500);
    cy.rvMap_SelectSpot({ timeout: 5500 });

    // ******** Ad Ons
    // FIRST ADD ON
    cy.get('[data-testid*="additive-input-minus"]')
      .eq(0) // Minus button
      .click();
    cy.wait(1000);

    // SECOND ADD ON
    cy.get('[data-testid*="additive-input-minus"]')
      .eq(1) // Minus button
      .click();
    cy.wait(1000);

    // THIRD ADD ON
    cy.get('[data-testid*="additive-input-minus"]')
      .eq(2) // Minus button
      .click();
    cy.wait(1000);

    cy.contains('REVIEW & SAVE').click();

    //VALIDATE ORDER SUMMARY
    cy.get('*[class^="MuiPaper-root MuiCard-root"]')
      .eq(7)
      .within(() => {
        cy.contains(valMyStartDate);
        cy.contains('Reserved');
        cy.contains(' RV Lot');
        cy.contains(valMyCurrentDate);
      });
    //SAVE
    cy.get('[data-testid="review-and-save-save-button"]').click();
    cy.wait(1000);
    //
  });
  it('3-Logs in as Venue admin, edits group order and pays', () => {
    cy.venueadmin();
    const constants = getConstants();
    const url = constants.apiURL;
    cy.wait(1500);
    cy.get('[id="renter"]')
      .focus()
      .clear()
      .type('automation');
    cy.wait(500);
    cy.contains('apply filters').click();
    cy.wait(500);
    cy.get('[class="customer-name-container"]', { timeout: 10000 })
      .eq(0)
      .click({ force: true });
    cy.wait(1500);
    cy.adminEditResButton().wait(1500);
    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
      .eq(5)
      .within(() => {
        cy.get('[data-testid="simple-menu"]')
          .click({ force: true }) // ... Menu
          .wait(500);
      });
    //Click Pay Reservation within the menu
    cy.get('[role="menu"]').within(() => {
      cy.get('[data-testid="simple-menu-make-payment"]').click({ force: true });
    });
    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
      .eq(7)
      .within(() => {
        //Payment details
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
          // Click Submit
          cy.get('[type="submit"]').click({ force: true });
          cy.intercept('POST', `${url}`).as('submit');
          cy.wait('@submit', { timeout: 8500 });
        });
      });
  });

  it.skip('4-Logs in as Venue admin, books Stalls, RV Spots & Add Ons (Yesterday to Today). Edit count of all & Save and Print', () => {
    cy.venueadmin();
    cy.contains('CREATE NEW').click();
    cy.get('[name="renterInformation.email"]')
      .click()
      .type('auto');
    cy.contains('[REDACTED]').click();
    //Search for and select event
    cy.get('[id="mui-component-select-EVENT"]').click();
    cy.contains('Automation Venue Test Event').click();

    //Enable Stalls Toggle
    const stallsToggle = cy.get('[class="MuiSwitch-root"]');
    stallsToggle.eq(0).click();
    cy.wait(1000);
    //Stalls Section
    cy.get('[name="stalls.quantity"]').type(1);

    // ****************** SETS THE DATES ************************
    cy.get('[name="start"]').type(myStartDate, { force: true });
    cy.get('[data-testid="back-date-modal"]').within(() => {
      cy.contains('Previous Date Selected');
      cy.contains('You selected a date that is in the past, do you want to continue with this selection?');
      cy.wait(1000);
      cy.get('[data-testid="back-date-modal-cancel"]').click();
    });
    cy.get('[name="start"]').type(myStartDate, { force: true });
    cy.get('[data-testid="back-date-modal"]').within(() => {
      cy.contains('Previous Date Selected');
      cy.contains('You selected a date that is in the past, do you want to continue with this selection?');
      cy.wait(1000);
      cy.get('[data-testid="back-date-modal-continue"]').click();
    });
    cy.get('[name="end"]').type(myCurrentDate, { force: true });
    // ************************************************************
    cy.get('[class="back-date-warning"]')
      .eq(0)
      .contains('Reservation includes a past date');
    //Click SELECT for stall rate
    cy.get('*[class^="MuiButtonBase-root MuiButton-root MuiButton-contained"]')
      .eq(0) //1st rate
      .click();

    cy.stallMap_RemoveSpot();

    //Enable Spots Toggle
    const spotsToggle = cy.get('[class="MuiSwitch-root"]');
    spotsToggle.eq(1).click();
    cy.wait(500);

    cy.get('[class*="MuiCheckbox-colorPrimary MuiIconButton-colorPrimary"]').click();
    cy.get('[class="back-date-warning"]')
      .eq(1)
      .contains('Reservation includes a past date');

    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
      .eq(2) //RV SECTION
      .within(() => {
        cy.get('[name="rv_spot.quantity"]')
          .focus()
          .type(1);

        cy.get('[class="MuiButton-label"]')
          .last()
          .contains('SELECT')
          .click();
      });
    cy.rvMap_RemoveSpot();

    // ADD ONS
    //Enable Add Ons Toggle
    const addOnsToggle = cy.get('[class="MuiSwitch-root"]');
    addOnsToggle.eq(2).click();

    // ******** Ad Ons
    // FIRST ADD ON
    cy.get('[class*="card-content open"]').within(() => {
      cy.get('[class*="MuiInputBase-formControl"]')
        .eq(5)
        .within(() => {
          cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
            .focus()
            .clear()
            .type('150'); // INPUT FIELD
        });
      cy.wait(1000);
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(0) // Minus button. Value = 149
        .click();
      cy.wait(1000);
      cy.get('[class*="MuiInputBase-formControl"]')
        .eq(5)
        .within(() => {
          cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
            .focus()
            .type('{backspace}')
            .type('{backspace}');
        });
      cy.get('[data-testid*="additive-input-plus"]')
        .eq(0) // Plus button. Value = 2
        .click()
        .wait(750);
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(0) // Minus button. Value = 1
        .click()
        .wait(750);
      // SECOND ADD ON
      cy.get('[class*="MuiInputBase-formControl"]')
        .eq(6)
        .within(() => {
          cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
            .focus()
            .clear()
            .type('150'); // INPUT FIELD
        });
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(1) // Minus button. Value = 149
        .click();

      cy.wait(1000);
      cy.get('[class*="MuiInputBase-formControl"]')
        .eq(6)
        .within(() => {
          cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
            .focus()
            .type('{backspace}')
            .type('{backspace}');
          //        .type('{backspace}') // VALUE IS 1
        })
        .wait(750);
      cy.get('[data-testid*="additive-input-plus"]')
        .eq(1) // Plus button. Value = 2
        .click();
      cy.wait(1000);
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(1) // Minus button. Value = 1
        .click();
      cy.wait(1000);

      // THIRD ADD ON
      cy.get('[class*="MuiInputBase-formControl"]')
        .eq(7)
        .within(() => {
          cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
            .focus()
            .clear()
            .type('150'); // INPUT FIELD
        });
      //cy.contains('Maximum exceeded')
      cy.wait(1000);
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(2) // Minus button. Value = 149
        .click();
      cy.wait(1000);
      cy.get('[class*="MuiInputBase-formControl"]')
        .eq(7)
        .within(() => {
          cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
            .focus()
            .type('{backspace}')
            .type('{backspace}');
          //        .type('{backspace}') // VALUE IS 1
        })
        .wait(750);
      cy.get('[data-testid*="additive-input-plus"]')
        .eq(2) // Plus button. Value = 2
        .click();
      cy.get('[data-testid*="additive-input-minus"]')
        .eq(2) // Minus button. Value = 1
        .click();
    });

    // ADMIN NOTES
    cy.adminNotesCreateRes();

    // SPECIAL REQUESTS
    cy.get('[name="renterNotes"]')
      .focus()
      .type('This is a test created via script ')
      .type(myNoteDate);
    cy.wait(500);

    //Payment details
    //DEFERRED:
    cy.get('[id="radio-deferred-payment"]').click(); //Group Bill
    cy.get('[id="mui-component-select-GROUP NAME"]').click({ force: true }); //Group field
    cy.contains('Automation Group').click({ force: true });

    cy.contains('REVIEW & SAVE').click();

    // CLICK EDIT BUTTON
    cy.get('[data-testid="review-and-save-edit-button"]').click();

    //Re-select Stalls
    cy.get('[name="stalls.quantity"]')
      .clear({ force: true })
      .type(1);
    cy.get('[data-testid="product-row-0-stalls-button"]').click();
    cy.stallMap_SelectSpot();

    cy.get('[class="MuiButton-label"]')
      .contains('SELECT')
      .first()
      .click();

    cy.get('[id="rv-button-1"]').click();


    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
      .eq(2) //RV SECTION
      .within(() => {
        cy.get('[name="rv_spot.quantity"]')
          .focus()
          .clear({ force: true })
          .type(1);
        cy.get('[class="MuiButton-label"]')
          .last()
          .contains('SELECT')
          .click();
      });
    cy.get('[id="rv-button-0"]').click();

    // REVIEW & SAVE
    cy.contains('REVIEW & SAVE')
      .click()
      .wait(2000);

    //VALIDATE ORDER SUMMARY
    cy.get('*[class^="MuiPaper-root MuiCard-root"]')
      .eq(7)
      .within(() => {
        cy.contains(valMyStartDate);
        cy.contains('Reserved');
        cy.contains(valMyCurrentDate);
      });

    //SAVE AND PRINT
    /* NOTE: Cannot stub outside of it() */
    let printStub;

    cy.window().then(win => {
      printStub = cy.stub(win, 'print');
      //    cy.contains(selectorForPrintButton, 'Print').click();
      cy.get('[data-testid="review-and-save-print-button"]').click();
      cy.wasCalled(printStub);
    });
    // })

    //    cy.get('[data-testid="review-and-save-print-button"]').click()
    cy.wait(1000);
  });
  //End of file
});
