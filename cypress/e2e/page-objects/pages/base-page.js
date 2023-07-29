class BasePage {

  static reloadPageAndWait() {
    cy.reload().then(() => {
      cy.get('i').then(($el) => {
        if ($el.is(':visible')) {
          cy.log('Spinner is still be visible but it is not relevant')
          cy.wait(5000)
        } else {
          cy.get('i').should('not.be.visible')
        }
      })
    }
    )
  }
}

export default BasePage