class NavigationToolBar {
  elements = {
    userSection: () => cy.get('.user > span'),
    documentsButton: () => cy.get('div#nav-docs'),
    messagesButton: () => cy.get('div#nav-mail')
  }

  navigateToDocuments() {
    this.elements.documentsButton().should('be.visible').click({ force: true })
  }

  navigateToMessages() {
    this.elements.messagesButton().should('be.visible').click({ force: true })
  }
}

export default NavigationToolBar