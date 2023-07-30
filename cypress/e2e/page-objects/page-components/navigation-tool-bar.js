class NavigationToolBar {
  elements = {
    userSection: () => cy.get('.user > span'),
    documentsButton: () => cy.get('div#nav-docs'),
    messagesButton: () => cy.get('div#nav-mail')
  }
}

export default NavigationToolBar