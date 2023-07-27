import ConfirmDeletionWindow from "./confirm-deletion-window"
import ToolBar from "./tool-bar"
import Destination from "../enums/destination"

const confirmDeletionWindow = new ConfirmDeletionWindow()
const toolBar = new ToolBar()

class NavigationToolBar {
  elements =
    {
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

  reloadPageAndWait() {
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

  clearTrashFolder(destination) {
    switch (destination) {
      case Destination.DOCUMENTS:
        this.navigateToDocuments()
        break
      case Destination.MESSAGES:
        this.navigateToMessages()
        break
      default:
        return cy.log('Destination is not reachable')
    }
    cy.contains('Trash').click({ force: true })
    toolBar.clickRefreshButton({ timeout: 1000 })
    toolBar.selectAllFiles()
    toolBar.clickEtcButton()
    toolBar.clickDeleteButtonInTrash()
    confirmDeletionWindow.clickYesBtn()
  }

}

export default NavigationToolBar