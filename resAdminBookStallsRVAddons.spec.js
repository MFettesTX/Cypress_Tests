/// <reference types="cypress" />
import { getConstants } from '../../fixtures/getConstants'
const moment = require('moment')

describe('Reservation Admin - Book Stalls, Spots and Add Ons', () => {
  before('Login', function() {
    cy.clearCookies()
    // Login as reservation admin
    cy.reservationAdminLogin(getConstants())
  })
  // **** THIS SECTION SETS THE DATES FROM CURRENT TO +x IN THE FUTURE ************
  var myCurrentDate = moment().format('MM/DD/YY')
  var myEndDate = moment()
    .add(1, 'd') //CHANGE THIS NUMBER
    .format('MM/DD/YY')
  // *************************** END OF DATE SET  *********************************

  //Login
  it('Logs in as reservation admin, books Stalls, RV Spots & Add Ons. Edit count of all & Save', () => {
    cy.contains('CREATE NEW').click()
    cy.get('[name="renterInformation.email"]')
      .click()
      .type('[REDACTED]')
    cy.contains('<REMOVED>').click()
    //Search for and select event
    cy.get('[id="mui-component-select-EVENT"]').click()
    cy.contains('Automation Venue Test Event').click()

    //Enable Stalls Toggle
    const stallsToggle = cy.get('[class="MuiSwitch-root"]')
    stallsToggle.eq(0).click()

    //Stalls Section
    cy.get('[name="stalls.quantity"]').type(2)
    // ****************** SETS THE DATES ************************
    cy.get('[name="startDate"]').type(myCurrentDate, { force: true })
    cy.get('[name="endDate"]').type(myEndDate, { force: true })
    // ************************************************************
    //Click SELECT for stall rate
    //cy.get('[data-testid="product-row-0-stalls-button"]').click()
    cy.get('*[class^="MuiButtonBase-root MuiButton-root MuiButton-contained"]')
      .eq(1)
      .click()
    cy.contains('Test Barn 1').click()
    cy.contains('Test Barn 2').click()
    // SELECT STALL # 4 & 5
    cy.get('[id="stall-button-4"]').click()
    cy.get('[id="stall-button-5"]').click()

    //cy.get('[class="MuiIconButton-label"]')
    //  .eq(3)
    //  .click() //RV TOGGLE
    //Enable Spots Toggle
    const spotsToggle = cy.get('[class="MuiSwitch-root"]')
    spotsToggle.eq(1).click()
    cy.get('[name="useResDates"]').click() //USE SAME DATES
    cy.get('[name="rv_spot.quantity"]')
      .focus()
      .type(2)

    // Select TEST_Green RV Lot
    cy.get('[data-testid="product-row-0-rvs-button"]').click()
    //E3-TEST RC Spot
    cy.get('[id="rv-button-0"]').click()
    cy.get('[id="rv-button-1"]').click()

    // ADD ONS
    //Enable Add Ons Toggle
    const addOnsToggle = cy.get('[class="MuiSwitch-root"]')
    addOnsToggle.eq(2).click()

    // ******** Ad Ons
  // ******** Ad Ons
  // TEST-Grass Hay
  cy.get('[class*="MuiInputBase-formControl"]')
    .eq(10)
    .within(() => {
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .focus()
        .type('151') // INPUT FIELD
    })
  cy.contains('Maximum exceeded')
  cy.wait(1000)
  cy.get('[class="MuiButtonBase-root MuiIconButton-root"]')
    .eq(0) // Minus button. Value = 150
    .click()
  cy.wait(1000)
  cy.get('[class*="MuiInputBase-formControl"]')
    .eq(10)
    .within(() => {
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .focus()
        .type('{backspace}')
        .type('{backspace}')
        .type('{backspace}') // VALUE IS 1
    })
  cy.get('[class="MuiButtonBase-root MuiIconButton-root"]')
    .eq(1) // Plus button. Value = 2
    .click()

  // TEST-Alfalfa Hay
  cy.get('[class*="MuiInputBase-formControl"]')
    .eq(11)
    .within(() => {
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .focus()
        .type('151') // INPUT FIELD
    })
  cy.get('[class="MuiButtonBase-root MuiIconButton-root"]')
    .eq(2) // Minus button. Value = 150
    .click()

  cy.wait(1000)
  cy.get('[class*="MuiInputBase-formControl"]')
    .eq(11)
    .within(() => {
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .focus()
        .type('{backspace}')
        .type('{backspace}')
        .type('{backspace}') // VALUE IS 1
    })
  cy.get('[class="MuiButtonBase-root MuiIconButton-root"]')
    .eq(3) // Plus button. Value = 2
    .click()
  cy.wait(1000)

  // TEST-Panel Removal
  cy.get('[class*="MuiInputBase-formControl"]')
    .eq(12)
    .within(() => {
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .focus()
        .type('151') // INPUT FIELD
    })
  cy.contains('Maximum exceeded')
  cy.wait(1000)
  cy.get('[class="MuiButtonBase-root MuiIconButton-root"]')
    .eq(4) // Minus button. Value = 150
    .click()
  cy.wait(1000)
  cy.get('[class*="MuiInputBase-formControl"]')
    .eq(12)
    .within(() => {
      cy.get('[class="MuiInputBase-input MuiFilledInput-input"]')
        .focus()
        .type('{backspace}')
        .type('{backspace}')
        .type('{backspace}') // VALUE IS 1
    })
  cy.get('[class="MuiButtonBase-root MuiIconButton-root"]')
    .eq(5) // Plus button. Value = 2
    .click()

    // SPECIAL REQUESTS
    cy.get('[name="renterNotes"]')
      .focus()
      .type('This is a test')
    cy.wait(500)
    //Payment details
    cy.get(
      '[class="MuiInputBase-input MuiFilledInput-input MuiInputBase-inputAdornedEnd MuiFilledInput-inputAdornedEnd"]',
    ).click()
    cy.contains('**** **** **** 4242').click({ force: true })

    // REVIEW & SAVE
    cy.contains('REVIEW & SAVE').click()

    // CLICK EDIT BUTTON
    cy.contains('[class="MuiButton-label"]', 'EDIT').click({ force: true })

    //Re-select Stalls
    cy.get('[name="stalls.quantity"]')
      .clear()
      .type(1)
    cy.get('[data-testid="product-row-1-stalls-button"]').click() //SELECT Barn 2
    cy.get('[id="stall-button-5"]').click()

    //Re-select Spots
    cy.get('[name="rv_spot.quantity"]')
      .clear()
      .focus()
      .type(1)
    cy.get('[data-testid="product-row-0-rvs-button"]').click() //GREEN Lot
    cy.get('[id="rv-button-1"]').click()

    // REVIEW & SAVE
    cy.contains('REVIEW & SAVE').click()

    //SAVE
    cy.get('*[class^="MuiButtonBase-root MuiButton-root MuiButton-contained"]')
      .eq(6)
      .click({ force: true }) //WORKS
  })
  //End of file
})
