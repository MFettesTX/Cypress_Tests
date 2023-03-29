/// <reference types="cypress" />
import { getConstants } from '../../fixtures/getConstants';

describe('venueAdminRefundCancelAllReservations', () => {
  beforeEach('Login', function() {
    cy.venueAdminLogin(getConstants());
  });
  afterEach(() => {
    cy.logout();
    //    cy.clearCookies()
    cy.reload({ force: true });
  });
  //Login
  it('1-Logs in as venue admin, refunds and cancels reservation', () => {
    const constants = getConstants();
    const url = constants.apiURL;
    cy.wait(3500);
    cy.get('body', { timeout: 10000 }).then(body => {
      cy.wait(1500).then(() => {
        if (body.find('.customer-name-container').length > 0) {
          for (let i = 0; i < body.find('.customer-name-container').length; i++) {
            cy.get('[name="event"]', { timeout: 5000 })
              .focus()
              .type('Automation');

            cy.get('[class*="__table"]', { timeout: 7500 }).then(() =>
              cy
                .get('[class="customer-name-container"]', { timeout: 10000 })
                .eq(0)
                .click({ force: true })
                .wait(1500)
                .get('[class*="table-row"]', { timeout: 10000 })
                .eq(0)
                .click()
                .get('div[class*="order-side-panel"]', { timeout: 5000 })
                .within(() => {
                  cy.get('[type="submit"]').click({ force: true });
                })
                .wait(1500)
                .get('[class="MuiButton-label"]')
                .contains('CANCEL RESERVATION')
                .click()

                // DEFERRED ORDER CANCELLATION
                .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                .eq(5)
                .then($OrderHistory => {
                  if ($OrderHistory.text().includes('Deferred')) {
                    //console.log('DEFERRED')
                    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      .eq(7)
                      .within(() => {
                        cy.contains('CANCEL RESERVATION').click();
                      });
                  }
                  //NON-DEFERRED ORDER REFUND AND CANCEL
                  else {
                    //console.log('PAID')
                    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      //.contains('Cancel Entire Reservation')
                      .eq(7)
                      .within(() => {
                        cy.get('[class^="MuiFormControlLabel-root"]')
                          .eq(1)
                          .click();

                        cy.contains('Cancel AND refund the reservation').click();
                      })
                      .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      .eq(7)
                      .within(() => {
                        cy.contains('CANCEL RESERVATION').click();
                      })
                      .get('[name="refundReason"]', { timeout: 5000 })
                      .focus()
                      .type('Automation test', { timeout: 5000 })
                      .wait(1000)
                      .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]', {
                        timeout: 10000
                      })
                      .eq(7)

                      .within(() => {
                        cy.get('[class="MuiTouchRipple-root"]')
                          .eq(1)
                          .click({ force: true })
                          .wait(2500);
                      });

                    cy.get('[data-testid="refund-confirm"]', {
                      timeout: 5000
                    }).click({ force: true });
                    //                    cy.intercept('POST', `${url}`).as('submit')
                    //                    cy.wait('@submit', { timeout: 8500 })
                    cy.cancelOrderToast();
                  }
                })
            );
          }
        }
      });
    });
  });
  it('2-Repeat', () => {
    const constants = getConstants();
    const url = constants.apiURL;
    cy.wait(3500);
    cy.get('body', { timeout: 11000 }).then(body => {
      cy.wait(1500).then(() => {
        if (body.find('.customer-name-container').length > 0) {
          for (let i = 0; i < body.find('.customer-name-container').length; i++) {
            cy.get('[name="event"]', { timeout: 5000 })
              .focus()
              .type('Automation');

            cy.get('[class*="__table"]', { timeout: 7500 }).then(() =>
              cy
                .get('[class="customer-name-container"]', { timeout: 10000 })
                .eq(0)
                .click({ force: true })
                .wait(1500)
                .get('[class*="table-row"]', { timeout: 10000 })
                .eq(0)
                .click()
                .get('div[class*="order-side-panel"]', { timeout: 5000 })
                .within(() => {
                  cy.get('[type="submit"]').click({ force: true });
                })
                .wait(1500)
                .get('[class="MuiButton-label"]')
                .contains('CANCEL RESERVATION')
                .click()

                // DEFERRED ORDER CANCELLATION
                .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                .eq(5)
                .then($OrderHistory => {
                  if ($OrderHistory.text().includes('Deferred')) {
                    //console.log('DEFERRED')
                    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      .eq(7)
                      .within(() => {
                        cy.contains('CANCEL RESERVATION').click();
                      });
                  }
                  //NON-DEFERRED ORDER REFUND AND CANCEL
                  else {
                    //console.log('PAID')
                    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      //.contains('Cancel Entire Reservation')
                      .eq(7)
                      .within(() => {
                        cy.get('[class^="MuiFormControlLabel-root"]')
                          .eq(1)
                          .click();

                        cy.contains('Cancel AND refund the reservation').click();
                      })
                      .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      .eq(7)
                      .within(() => {
                        cy.contains('CANCEL RESERVATION').click();
                      })
                      .get('[name="refundReason"]', { timeout: 5000 })
                      .focus()
                      .type('Automation test', { timeout: 5000 })
                      .wait(1000)
                      .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]', {
                        timeout: 10000
                      })
                      .eq(7)

                      .within(() => {
                        cy.get('[class="MuiTouchRipple-root"]')
                          .eq(1)
                          .click({ force: true })
                          .wait(2500);
                      });

                    cy.get('[data-testid="refund-confirm"]', {
                      timeout: 5000
                    }).click({ force: true });
                    //                    cy.intercept('POST', `${url}`).as('submit')
                    //                    cy.wait('@submit', { timeout: 8500 })
                    cy.cancelOrderToast();
                  }
                })
            );
          }
        }
      });
    });
  });

  it('3-Repeat', () => {
    const constants = getConstants();
    const url = constants.apiURL;
    cy.wait(2500);
    cy.get('body', { timeout: 10000 }).then(body => {
      cy.wait(1500).then(() => {
        if (body.find('.customer-name-container').length > 0) {
          for (let i = 0; i < body.find('.customer-name-container').length; i++) {
            cy.get('[name="event"]', { timeout: 5000 })
              .focus()
              .type('Automation');

            cy.get('[class*="__table"]', { timeout: 7500 }).then(() =>
              cy
                .get('[class="customer-name-container"]', { timeout: 10000 })
                .eq(0)
                .click({ force: true })
                .wait(1500)
                .get('[class*="table-row"]', { timeout: 10000 })
                .eq(0)
                .click()
                .get('div[class*="order-side-panel"]', { timeout: 5000 })
                .within(() => {
                  cy.get('[type="submit"]').click({ force: true });
                })
                .wait(1500)
                .get('[class="MuiButton-label"]')
                .contains('CANCEL RESERVATION')
                .click()

                // DEFERRED ORDER CANCELLATION
                .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                .eq(5)
                .then($OrderHistory => {
                  if ($OrderHistory.text().includes('Deferred')) {
                    //console.log('DEFERRED')
                    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      .eq(7)
                      .within(() => {
                        cy.contains('CANCEL RESERVATION').click();
                      });
                  }
                  //NON-DEFERRED ORDER REFUND AND CANCEL
                  else {
                    //console.log('PAID')
                    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      //.contains('Cancel Entire Reservation')
                      .eq(7)
                      .within(() => {
                        cy.get('[class^="MuiFormControlLabel-root"]')
                          .eq(1)
                          .click();

                        cy.contains('Cancel AND refund the reservation').click();
                      })
                      .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      .eq(7)
                      .within(() => {
                        cy.contains('CANCEL RESERVATION').click();
                      })
                      .get('[name="refundReason"]', { timeout: 5000 })
                      .focus()
                      .type('Automation test', { timeout: 5000 })
                      .wait(1000)
                      .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]', {
                        timeout: 10000
                      })
                      .eq(7)

                      .within(() => {
                        cy.get('[class="MuiTouchRipple-root"]')
                          .eq(1)
                          .click({ force: true })
                          .wait(2500);
                      });

                    cy.get('[data-testid="refund-confirm"]', {
                      timeout: 5000
                    }).click({ force: true });
                    //                    cy.intercept('POST', `${url}`).as('submit')
                    //                    cy.wait('@submit', { timeout: 8500 })
                    cy.cancelOrderToast();
                  }
                })
            );
          }
        }
      });
    });
  });
  it('4-Repeat', () => {
    const constants = getConstants();
    const url = constants.apiURL;
    cy.wait(2500);
    cy.get('body', { timeout: 10000 }).then(body => {
      cy.wait(1500).then(() => {
        if (body.find('.customer-name-container').length > 0) {
          for (let i = 0; i < body.find('.customer-name-container').length; i++) {
            cy.get('[name="event"]', { timeout: 5000 })
              .focus()
              .type('Automation');

            cy.get('[class*="__table"]', { timeout: 7500 }).then(() =>
              cy
                .get('[class="customer-name-container"]', { timeout: 10000 })
                .eq(0)
                .click({ force: true })
                .wait(1500)
                .get('[class*="table-row"]', { timeout: 10000 })
                .eq(0)
                .click()
                .get('div[class*="order-side-panel"]', { timeout: 5000 })
                .within(() => {
                  cy.get('[type="submit"]').click({ force: true });
                })
                .wait(1500)
                .get('[class="MuiButton-label"]')
                .contains('CANCEL RESERVATION')
                .click()

                // DEFERRED ORDER CANCELLATION
                .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                .eq(5)
                .then($OrderHistory => {
                  if ($OrderHistory.text().includes('Deferred')) {
                    //console.log('DEFERRED')
                    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      .eq(7)
                      .within(() => {
                        cy.contains('CANCEL RESERVATION').click();
                      });
                  }
                  //NON-DEFERRED ORDER REFUND AND CANCEL
                  else {
                    //console.log('PAID')
                    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      //.contains('Cancel Entire Reservation')
                      .eq(7)
                      .within(() => {
                        cy.get('[class^="MuiFormControlLabel-root"]')
                          .eq(1)
                          .click();

                        cy.contains('Cancel AND refund the reservation').click();
                      })
                      .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      .eq(7)
                      .within(() => {
                        cy.contains('CANCEL RESERVATION').click();
                      })
                      .get('[name="refundReason"]', { timeout: 5000 })
                      .focus()
                      .type('Automation test', { timeout: 5000 })
                      .wait(1000)
                      .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]', {
                        timeout: 10000
                      })
                      .eq(7)

                      .within(() => {
                        cy.get('[class="MuiTouchRipple-root"]')
                          .eq(1)
                          .click({ force: true })
                          .wait(2500);
                      });

                    cy.get('[data-testid="refund-confirm"]', {
                      timeout: 5000
                    }).click({ force: true });
                    //                    cy.intercept('POST', `${url}`).as('submit')
                    //                    cy.wait('@submit', { timeout: 8500 })
                    cy.cancelOrderToast();
                  }
                })
            );
          }
        }
      });
    });
  });
  it('5-Repeat', () => {
    const constants = getConstants();
    const url = constants.apiURL;
    cy.wait(2500);
    cy.get('body', { timeout: 10000 }).then(body => {
      cy.wait(1500).then(() => {
        if (body.find('.customer-name-container').length > 0) {
          for (let i = 0; i < body.find('.customer-name-container').length; i++) {
            cy.get('[name="event"]', { timeout: 5000 })
              .focus()
              .type('Automation');

            cy.get('[class*="__table"]', { timeout: 7500 }).then(() =>
              cy
                .get('[class="customer-name-container"]', { timeout: 10000 })
                .eq(0)
                .click({ force: true })
                .wait(1500)
                .get('[class*="table-row"]', { timeout: 10000 })
                .eq(0)
                .click()
                .get('div[class*="order-side-panel"]', { timeout: 5000 })
                .within(() => {
                  cy.get('[type="submit"]').click({ force: true });
                })
                .wait(1500)
                .get('[class="MuiButton-label"]')
                .contains('CANCEL RESERVATION')
                .click()

                // DEFERRED ORDER CANCELLATION
                .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                .eq(5)
                .then($OrderHistory => {
                  if ($OrderHistory.text().includes('Deferred')) {
                    //console.log('DEFERRED')
                    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      .eq(7)
                      .within(() => {
                        cy.contains('CANCEL RESERVATION').click();
                      });
                  }
                  //NON-DEFERRED ORDER REFUND AND CANCEL
                  else {
                    //console.log('PAID')
                    cy.get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      //.contains('Cancel Entire Reservation')
                      .eq(7)
                      .within(() => {
                        cy.get('[class^="MuiFormControlLabel-root"]')
                          .eq(1)
                          .click();

                        cy.contains('Cancel AND refund the reservation').click();
                      })
                      .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]')
                      .eq(7)
                      .within(() => {
                        cy.contains('CANCEL RESERVATION').click();
                      })
                      .get('[name="refundReason"]', { timeout: 5000 })
                      .focus()
                      .type('Automation test', { timeout: 5000 })
                      .wait(1000)
                      .get('[class*="MuiPaper-elevation1 MuiPaper-rounded"]', {
                        timeout: 10000
                      })
                      .eq(7)

                      .within(() => {
                        cy.get('[class="MuiTouchRipple-root"]')
                          .eq(1)
                          .click({ force: true })
                          .wait(2500);
                      });

                    cy.get('[data-testid="refund-confirm"]', {
                      timeout: 5000
                    }).click({ force: true });
                    //                    cy.intercept('POST', `${url}`).as('submit')
                    //                    cy.wait('@submit', { timeout: 8500 })
                    cy.cancelOrderToast();
                  }
                })
            );
          }
        }
      });
    });
  });

  //EOF
});
