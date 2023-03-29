/// <reference types="cypress" />
import { CacheKeyNode } from 'apollo-cache-inmemory/lib/cacheKeys';
import { getConstants } from '../../../../fixtures/getConstants';
const moment = require('moment');
import { getTestCreditCard } from '../../../../utils/ccUtil';

// **** THIS SECTION SETS THE DATES FROM CURRENT TO +x IN THE FUTURE ************
var myCurrentDate = moment().format('MM/DD/YY');
var myCurrentTime = moment().format('hh:mm:ss a');
var myEndDate = moment()
  .add(1, 'd') //CHANGE THIS NUMBER
  .format('MM/DD/YY');
// *************************** END OF DATE SET  *********************************

describe('venueAdminEditRes-ReduceDatesAndQty-SplitPayments', () => {
  beforeEach('Login', function() {
    // Login as venue admin
    cy.venueAdminLogin(getConstants({ timeout: 10000 }));
  });
  afterEach(() => {
    cy.logout();
    cy.clearCookies();
    cy.reload({ force: true });
  });
  // **** THIS SECTION SETS THE DATES FROM CURRENT TO +x IN THE FUTURE ************
  var myCurrentDate = moment().format('MM/DD/YY');
  var valMyCurrentDate = moment().format('MM/DD/YY');
  //var valMyCurrentDay = moment().format('ddd')
  var myEndDate = moment()
    .add(1, 'd') //CHANGE THIS NUMBER FOR NUMBER OF DAYS FOR ORDER
    .format('MM/DD/YY');
  var valMyEndDate = moment()
    .add(1, 'd') //CHANGE THIS NUMBER FOR NUMBER OF DAYS FOR ORDER
    .format('MM/DD/YY');
  //var valMyEndDay = moment().format('ddd')
  // *************************** END OF DATE SET  *********************************
  it('1-Venue Admin logs in, books 2 Stalls, 2 RV Spots & 2 of each Add Ons for 2 Days. Changes status to Checked In & Saves', () => {
    const constants = getConstants();
    const url = constants.apiURL;
    cy.venueadmin();
    cy.contains('CREATE NEW').click();
    cy.get('[name="renterInformation.email"]')
      .click()
      .type('automation');
    cy.contains('[REDACTED]').click();
    //Search for and select event
    cy.get('[id="mui-component-select-EVENT"]').click();

    cy.contains('Automation Venue Test Event').click({ force: true });

    //Enable Stalls Toggle
    const stallsToggle = cy.get('[class="MuiSwitch-root"]');
    stallsToggle.eq(0).click();

    //Stalls Section
    cy.get('[name="stalls.quantity"]').type(2);
    cy.qty_decrease_stall();
    cy.qty_increase_stall();

    // ****************** SETS THE DATES ************************
    var myCurrentDate = moment().format('MM/DD/YYYY');
    cy.get('[name="start"]').type(myCurrentDate, { force: true });
    var myEndDate = moment()
      .add(2, 'd') //CHANGE THIS NUMBER
      .format('MM/DD/YYYY');
    cy.get('[name="end"]').type(myEndDate, { force: true });
    // ************************************************************
    //Set Stall Status to CHECKED IN
    cy.get('[id="mui-component-select-STATUS"]')
      .contains('Reserved')
      .click()
      .wait(500);
    cy.get('[data-value="2"]').click({ force: true }); //CHECKED IN

    //Click SELECT for stall rate
    cy.selectStallRate();
    // SELECT FIRST AND SECOND AVAILABLE STALL
    cy.stallMap_SelectSpot();
    cy.stallMap_SelectSpot();

    cy.adminStallQuestions();

    //Enable RV Spots Toggle
    const rvToggle = cy.get('[class="MuiSwitch-root"]');
    rvToggle
      .eq(1)
      .click()
      .wait(500);

    cy.get('[name="rv_spot.quantity"]')
      .focus()
      .type(2);
    cy.qty_decrease_rv();
    cy.qty_increase_rv();

    cy.adminRVQuestions().wait(1000);
    cy.selectRVRate({ force: true });
    cy.rvMap_SelectSpot({ force: true });
    cy.rvMap_SelectSpot({ force: true });

    //Set Status to CHECKED IN
    cy.get('[id="mui-component-select-STATUS"]')
      .contains('Reserved')
      .click()
      .wait(500);
    cy.get('[data-value="2"]').click({ force: true }); //CHECKED IN
    // ADD ONS
    //Enable Add Ons Toggle
    const addOnsToggle = cy.get('[class="MuiSwitch-root"]');
    addOnsToggle.eq(2).click();

    // ******** Ad Ons
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

    cy.selectStallRate();
    cy.selectRVRate();

    cy.adminNotesCreateRes();
    // SPECIAL REQUESTS
    cy.get('[name="renterNotes"]')
      .focus()
      .type('This is a test');
    cy.wait(500);

    //Payment details
    //cy.processCC();
    cy.get('[data-testid="card_payment_details"]').within(() => {
      cy.wait(500)
        .get('[id="cash-control"]')
        .click({ force: true })
        .wait(500)
        .get('[name="cashOrCheck"]')
        .focus()
        .type('15', { force: true })
        .wait(500)
        .get('[class="MuiButton-label"]')
        .contains('CONFIRM')
        .click({ force: true });

      //CC portion
      cy.processCC();
    });
    cy.contains('REVIEW & SAVE', { timeout: 5000 }).click();

    //SAVE
    cy.postReviewSaveWaitAPI();
    cy.stallAddOnSuccessToast();
  });
  it('2-Venue Admin finds and edit reservation - removes one each stalls/spots/add ons/dates then CANCELS', () => {
    const constants = getConstants();
    const url = constants.apiURL;
    cy.venueadmin();
    cy.wait(500);

    cy.get('[id="renter"]')
      .focus()
      .type('Automation');
    cy.get('[name="hasStalls"]').click(); // HAS STALLS CHECK BOX
    cy.get('[name="hasRVs"]').click(); // HAS RVS CHECK BOX
    cy.contains('apply filters').click();
    cy.wait(500);

    cy.get('[class="customer-name-container"]', { timeout: 10000 })
      .eq(0)
      .click({ force: true });
    cy.wait(1500);
    cy.contains('Edit Reservation', { timeout: 5000 }).click();
    cy.wait(1500);

    //EDIT STALLS
    cy.get('[class*="edit-options-container"]')
      .eq(0)
      .click();
    cy.wait(1000);
    cy.get('[data-testid="simple-menu-edit"]')
      .eq(0)
      .click({ force: true });

    //Click down arrow to reduce qty from 2 to 1
    cy.get('[class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall"]')
      .eq(1)
      .click({ force: true });

    //Are you Sure?
    //cy.get('[data-testid="back-date-modal"]').within(() =>{
    //  cy.wait(1000)
    //  cy.get('[data-testid="back-date-modal-continue"]').click({force:true})
    //})

    // ****************** SETS THE DATES ************************
    var myCurrentDate = moment().format('MM/DD/YYYY');
    cy.get('[name="startDate"]')
      .clear({ force: true })
      .type(myCurrentDate, { force: true });
    var myEndDate = moment()
      .add(1, 'd') //CHANGE THIS NUMBER
      .format('MM/DD/YYYY');
    cy.get('[name="endDate"]')
      .clear({ force: true })
      .type(myEndDate, { force: true });
    // ************************************************************

    cy.wait(500);
    cy.stallMap_RemoveSpot();
    cy.wait(1000);

    //SET STALL STATUS BACK TO RESERVED
    const statusToggleExpandStalls = cy.get('[id="mui-component-select-STATUS"]');
    statusToggleExpandStalls.eq(0).click();
    const statusToggleSelectStalls = cy.get('[data-value="1"]');
    statusToggleSelectStalls.should('be.visible');
    statusToggleSelectStalls.eq(0).click(); //RESERVED

    // EDIT RV
    cy.wait(1500);
    cy.get('[data-testid="simple-menu"]')
      .eq(1)
      .click(); // EXPAND ... MENU FOR RVS
    cy.get('[data-testid="simple-menu-edit"]')
      .eq(1)
      .click(); // EDIT option for RVS
    cy.get('[name="rv_spot.quantity"]')
      .clear()
      .type(1);
    cy.wait(1500);

    //Are you Sure?
    //cy.get('[data-testid="back-date-modal"]').within(() =>{
    //  cy.wait(1000)
    //  cy.get('[data-testid="back-date-modal-continue"]').click({force:true})
    //})

    // ****************** SETS THE DATES ************************
    var myCurrentDate = moment().format('MM/DD/YYYY');
    cy.get('[name="startDate"]')
      .eq(1)
      .clear({ force: true })
      .type(myCurrentDate, { force: true });
    var myEndDate = moment()
      .add(1, 'd') //CHANGE THIS NUMBER
      .format('MM/DD/YYYY');
    cy.get('[name="endDate"]')
      .eq(1)
      .clear({ force: true })
      .type(myEndDate, { force: true });
    // ************************************************************

    cy.wait(1500);
    cy.rvMap_RemoveSpot();
    cy.wait(1000);

    //SET RV STATUS TO RESERVED
    const statusToggleExpandRVs = cy.get('[id="mui-component-select-STATUS"]');
    statusToggleExpandRVs.eq(1).click({ force: true });
    const statusToggleSelectRVs = cy.get('[data-value="1"]');
    statusToggleSelectRVs.should('be.visible');
    statusToggleSelectRVs.eq(0).click({ force: true }); //RESERVED

    // EDIT ADD ONS
    cy.get('[data-testid="simple-menu"]')
      .eq(2)
      .click(); // EXPAND ... MENU FOR ADD ONS
    cy.get('[data-testid="simple-menu-edit"]')
      .eq(2)
      .click(); // EDIT option for ADD ONS
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

    cy.adminNotesEditRes().wait(1500);
    cy.contains('REVIEW & SAVE CHANGES').click();
    cy.wait(1000);

    // VALIDATE YELLOW HIGHLIGHTS ON CHANGES
    cy.get('span[class="highlighted"]')
      .eq(0)
      .should('exist'); //Stall Dates
    cy.get('span[class="highlighted"]')
      .eq(1)
      .should('exist'); //Stalls
    cy.get('span[class="highlighted"]')
      .eq(2)
      .should('exist'); //RV Dates
    cy.get('span[class="highlighted"]')
      .eq(3)
      .should('exist'); //RV Spot

    cy.get('div[class="highlighted"]')
      .eq(0)
      .should('exist'); //Addon 1
    cy.get('div[class="highlighted"]')
      .eq(1)
      .should('exist'); //Addon 2
    cy.get('div[class="highlighted"]')
      .eq(2)
      .should('exist'); //Addon 3
    cy.get('div[class*="highlighted"]')
      .eq(3)
      .should('exist'); //Admin Notes

    // VALIDATE ORDER HISTORY
    //cy.get('[class*="__review-updates"]').within(() => {
    cy.get('[class*="__transaction_history_row"]').within(() => {
      cy.get('[class="item-change"]')
        .eq(0)
        .contains('Removed 1 stall x 2 nights'); //STALL
      cy.get('[class="item-change"]')
        .eq(1)
        .contains('Reduced 1 stall x 1 night');

      cy.get('[class="item-change"]')
        .eq(2)
        .contains('Removed 1 spot x 2 nights'); //RV
      cy.get('[class="item-change"]')
        .eq(3)
        .contains('Reduced 1 spot x 1 night'); //RV

      cy.get('[class="item-change"]')
        .eq(4)
        .contains('Removed 1'); //Addon 1
      cy.get('[class="item-change"]')
        .eq(5)
        .contains('Removed 1'); //Addon 2
      cy.get('[class="item-change"]')
        .eq(6)
        .contains('Removed 1'); //Addon 3

      //Fees
      cy.get('[class*="__payment-line"]')
        .eq(0)
        .contains('Current charges');
      cy.get('[class*="__payment-line"]')
        .eq(1)
        .contains('Total including fees');
      cy.get('[class="total refund"]')
        .contains('-') //Indicates Refund
        .should('have.css', 'color', 'rgb(238, 82, 83)'); //Verifies text is red
    });
    cy.contains('NEXT').click();
    cy.contains('GO BACK').click();
  });

  it('3-Venue Admin finds and edit reservation - removes one each stalls/spots/add ons/dates then  SAVES', () => {
    const constants = getConstants();
    const url = constants.apiURL;
    cy.venueadmin();
    cy.wait(500);

    cy.get('[id="renter"]')
      .focus()
      .type('Automation');
    cy.get('[name="hasStalls"]').click(); // HAS STALLS CHECK BOX
    cy.get('[name="hasRVs"]').click(); // HAS RVS CHECK BOX
    cy.contains('apply filters').click();
    cy.wait(500);

    cy.get('[class="customer-name-container"]', { timeout: 10000 })
      .eq(0)
      .click({ force: true });
    cy.wait(1500);
    cy.contains('Edit Reservation', { timeout: 5000 }).click();
    cy.wait(1500);

    //EDIT STALLS
    cy.get('[class*="edit-options-container"]')
      .eq(0)
      .click();
    cy.wait(1000);
    cy.get('[data-testid="simple-menu-edit"]')
      .eq(0)
      .click({ force: true });

    //Click down arrow to reduce qty from 2 to 1
    cy.get('[class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall"]')
      .eq(1)
      .click({ force: true });

    // ****************** SETS THE DATES ************************
    var myCurrentDate = moment().format('MM/DD/YYYY');
    cy.get('[name="startDate"]')
      .clear({ force: true })
      .type(myCurrentDate, { force: true });
    var myEndDate = moment()
      .add(1, 'd') //CHANGE THIS NUMBER
      .format('MM/DD/YYYY');
    cy.get('[name="endDate"]')
      .clear({ force: true })
      .type(myEndDate, { force: true });
    // ************************************************************

    cy.wait(500);
    cy.stallMap_RemoveSpot();
    cy.wait(1000);

    //SET STALL STATUS BACK TO RESERVED
    const statusToggleExpandStalls = cy.get('[id="mui-component-select-STATUS"]');
    statusToggleExpandStalls.eq(0).click();
    const statusToggleSelectStalls = cy.get('[data-value="1"]');
    statusToggleSelectStalls.should('be.visible');
    statusToggleSelectStalls.eq(0).click(); //RESERVED

    // EDIT RV
    cy.wait(1500);
    cy.get('[data-testid="simple-menu"]')
      .eq(1)
      .click(); // EXPAND ... MENU FOR RVS
    cy.get('[data-testid="simple-menu-edit"]')
      .eq(1)
      .click(); // EDIT option for RVS
    cy.get('[name="rv_spot.quantity"]')
      .clear()
      .type(1);
    cy.wait(1500);

    // ****************** SETS THE DATES ************************
    var myCurrentDate = moment().format('MM/DD/YYYY');
    cy.get('[name="startDate"]')
      .eq(1)
      .clear({ force: true })
      .type(myCurrentDate, { force: true });
    var myEndDate = moment()
      .add(1, 'd') //CHANGE THIS NUMBER
      .format('MM/DD/YYYY');
    cy.get('[name="endDate"]')
      .eq(1)
      .clear({ force: true })
      .type(myEndDate, { force: true });
    // ************************************************************

    cy.wait(1500);
    cy.rvMap_RemoveSpot();
    cy.wait(1000);

    //SET RV STATUS TO RESERVED
    const statusToggleExpandRVs = cy.get('[id="mui-component-select-STATUS"]');
    statusToggleExpandRVs.eq(1).click({ force: true });
    const statusToggleSelectRVs = cy.get('[data-value="1"]');
    statusToggleSelectRVs.should('be.visible');
    statusToggleSelectRVs.eq(0).click({ force: true }); //RESERVED

    // EDIT ADD ONS
    cy.get('[data-testid="simple-menu"]')
      .eq(2)
      .click(); // EXPAND ... MENU FOR ADD ONS
    cy.get('[data-testid="simple-menu-edit"]')
      .eq(2)
      .click(); // EDIT option for ADD ONS
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

    cy.adminNotesEditRes().wait(1500);
    cy.contains('REVIEW & SAVE CHANGES').click();
    cy.wait(1000);

    // VALIDATE YELLOW HIGHLIGHTS ON CHANGES
    cy.get('span[class="highlighted"]')
      .eq(0)
      .should('exist'); //Stall Dates
    cy.get('span[class="highlighted"]')
      .eq(1)
      .should('exist'); //Stalls
    cy.get('span[class="highlighted"]')
      .eq(2)
      .should('exist'); //RV Dates
    cy.get('span[class="highlighted"]')
      .eq(3)
      .should('exist'); //RV Spot

    cy.get('div[class="highlighted"]')
      .eq(0)
      .should('exist'); //Addon 1
    cy.get('div[class="highlighted"]')
      .eq(1)
      .should('exist'); //Addon 2
    cy.get('div[class="highlighted"]')
      .eq(2)
      .should('exist'); //Addon 3
    cy.get('div[class*="highlighted"]')
      .eq(3)
      .should('exist'); //Admin Notes

    // VALIDATE ORDER HISTORY
    //cy.get('[class*="__review-updates"]').within(() => {
    cy.get('[class*="__transaction_history_row"]').within(() => {
      cy.get('[class="item-change"]')
        .eq(0)
        .contains('Removed 1 stall x 2 nights'); //STALL
      cy.get('[class="item-change"]')
        .eq(1)
        .contains('Reduced 1 stall x 1 night');

      cy.get('[class="item-change"]')
        .eq(2)
        .contains('Removed 1 spot x 2 nights'); //RV
      cy.get('[class="item-change"]')
        .eq(3)
        .contains('Reduced 1 spot x 1 night'); //RV

      cy.get('[class="item-change"]')
        .eq(4)
        .contains('Removed 1'); //Addon 1
      cy.get('[class="item-change"]')
        .eq(5)
        .contains('Removed 1'); //Addon 2
      cy.get('[class="item-change"]')
        .eq(6)
        .contains('Removed 1'); //Addon 3

      //Fees
      cy.get('[class*="__payment-line"]')
        .eq(0)
        .contains('Current charges');
      cy.get('[class*="__payment-line"]')
        .eq(1)
        .contains('Total including fees');
      cy.get('[class="total refund"]')
        .contains('-') //Indicates Refund
        .should('have.css', 'color', 'rgb(238, 82, 83)'); //Verifies text is red
    });
    // SAVE CHANGES
    cy.contains('NEXT')
      .click()
      .wait(500);
    cy.get('[data-testid="refund-display-card-options"]').click({ force: true });
    cy.get('[data-testid="refund-amount-money-field"]')
      .eq(0)
      .clear()
      .type('15.00');
    cy.get('[data-testid="refund-amount-money-field"]')
      .eq(1)
      .clear()
      .type('17.50');
    cy.get('[data-testid="return-reason-field"]').type('Done via Automated Script');
    cy.get('[data-testid="refund-confirm"]').click({ force: true });
    // cy.orderUpdatedToast();
  });
  it('4-Logs in as Venue Admin, edits order and examines Order History Details', () => {
    cy.venueadmin();
    cy.wait(500);
    cy.get('[id="renter"]')
      .focus()
      .clear()
      .type('automation');
    cy.wait(500);
    cy.contains('apply filters').click();
    cy.wait(2000);
    cy.get('[class="customer-name-container"]')
      .eq(0)
      .click({ force: true });

    cy.wait(500);
    cy.adminEditResButton().wait(1500);
    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
      .eq(5)
      .within(() => {
        cy.get('[data-testid="simple-menu"]')
          .click({ force: true }) // ... Menu
          .wait(500);
      });
    cy.get('[class="MuiList-root MuiMenu-list MuiList-padding"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="simple-menu-details"]').click({ force: true }); // VIEW DETAILS
      });
    cy.get('[class*="__history-details-wrapper MuiGrid-container"]')
      .eq(0)
      .contains(' $15.00 refunded to cash');
    cy.get('[class*="__history-details-wrapper MuiGrid-container"]')
      .eq(1)
      .contains(' $17.50 refunded to visa -4242');
    cy.get('[class*="__history-details-wrapper MuiGrid-container"]')
      .eq(2)
      .contains('Removed 1 RV spot x 2 nights');
    cy.get('[class*="__history-details-wrapper MuiGrid-container"]')
      .eq(2)
      .contains('Reduced 1 RV spot x 1 night');
    cy.get('[class*="__history-details-wrapper MuiGrid-container"]')
      .eq(3)
      .contains('Reduced 1 ');
    cy.get('[class*="__history-details-wrapper MuiGrid-container"]')
      .eq(4)
      .contains('Reduced 1 ');
    cy.get('[class*="__history-details-wrapper MuiGrid-container"]')
      .eq(5)
      .contains('Reduced 1 ');
    cy.get('[class*="__history-details-wrapper MuiGrid-container"]')
      .eq(6)
      .contains('Removed 1 stall x 2 nights');
    cy.get('[class*="__history-details-wrapper MuiGrid-container"]')
      .eq(6)
      .contains('Reduced 1 stall x 1 night');
    //cy.get('[class*="__history-details-wrapper MuiGrid-container"]')
    //.eq(8)
    //.contains('Reduced 1 stall x 1 night');
  });
  //End of file
});
