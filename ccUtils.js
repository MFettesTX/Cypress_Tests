const getTestCreditCard = (
  TestCreditCard = [
    //CARD LIST AS OF 2.15.22 W/O UNIONPAY CARD
    //UNIONPAY CARD causes issues if used
    '4242424242424242', //VISA  [3 digit CVV]
    '4000056655665556', //VISA DEBIT [3 digit CVV]
    '5555555555554444', //MASTERCARD [3 digit CVV]
    '2223003122003222', //MASTERCARD 2 SERIES [3 digit CVV]
    '5200828282828210', //MASTERCARD DEBIT [3 digit CVV]
    '5105105105105100', //MASTERCARD PREPAID [3 digit CVV]
    '378282246310005', //AMEX [4 digit CVV]
    '371449635398431', //AMEX [4 digit CVV]
    '6011111111111117', //DISCOVER [3 digit CVV]
    '6011000990139424', //DISCOVER [3 digit CVV]
    '3056930009020004', //DINER'S CLUB [3 digit CVV]
    '36227206271667', //DINER'S CLUB 14 DIGIT [3 digit CVV]
    '3566002020360505', //JCB [3 digit CVV]
    // 4000001240000000 Canadian Visa [3 digit CVV]
    // 4000004840008001 Mexico Visa [3 digit CVV]
  ],
) => {
  const cards =
    TestCreditCard[Math.floor(Math.random() * TestCreditCard.length)]

  return cards
}

export { getTestCreditCard }
