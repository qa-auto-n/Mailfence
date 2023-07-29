import DashboardPage from "../page-objects/pages/dashboard-page"
import LoginPage from "../page-objects/pages/login-page"
import NavigationToolbar from "../page-objects/page-components/navigation-tool-bar"
import DocumentsPage from "../page-objects/pages/documents-page"
import MessagesPage from "../page-objects/pages/messages-page"
import MessagesTreePanel from "../page-objects/page-components/messages-tree-panel"
import MessagesToolBar from "../page-objects/page-components/messages-toolbar"
import BasePage from "../page-objects/pages/base-page"
import DocumentsTreePanel from "../page-objects/page-components/documents-tree-panel"

const dashboardPage = new DashboardPage()
const loginPage = new LoginPage()
const navigationToolbar = new NavigationToolbar()
const documentsPage = new DocumentsPage()
const messagesPage = new MessagesPage()
const messagesTreePanel = new MessagesTreePanel()
const messagesToolbar = new MessagesToolBar()
const documentsTreePanel = new DocumentsTreePanel()

describe('Mail Attachment', function () {

  before(function () {
    cy.fixture('user-info').then(function (userData) {
      this.userData = userData
    })

    cy.fixture('letter-info').then(function (letterInfo) {
      this.letterInfo = letterInfo
      cy.generateFixtureFile(letterInfo.letterFileName, letterInfo.letterText)
    })
  })

  it('should send and receive an email with an attachment', function () {
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    // Log in
    cy.visit(Cypress.env('url'))
    dashboardPage.clickLoginButton()
    loginPage.login(email, password)
    navigationToolbar.elements.userSection().then(function (name) {
      const actualName = name.text()
      expect(actualName).to.equal(this.userData.name)
    })

    // Attach new .txt file
    let fileToUpload = this.letterInfo.letterFileName
    navigationToolbar.navigateToDocuments()
    cy.uploadDocument(fileToUpload)
    documentsPage.getUploadedFileNameByTitle(fileToUpload).should('be.visible')

    // Send email with attached file to myself
    navigationToolbar.navigateToMessages()
    messagesToolbar.elements.newButton().click()
    messagesPage.fillLetter(email, this.letterInfo.subject, this.letterInfo.content)
    messagesPage.addAttachmentFromDocuments(this.letterInfo.letterFileName)
    messagesPage.elements.addedAttachment().should('contain', this.letterInfo.letterFileName)
    messagesToolbar.elements.sendLetterButton().click()

    // Check that email recieved
    messagesTreePanel.clickInbox({ timeout: 5000 })
    messagesToolbar.clickRefreshButton()
    messagesPage.elements.unreadLetters()
      .find('div.listSubject')
      .contains(this.letterInfo.subject)
      .should('exist')

    // Open recieved email and save the attached file to My Documents
    messagesPage.openUnreadLetterByTitle(this.letterInfo.subject)
    messagesPage.saveAttachmentInDocuments()

    // Open Documents, rename just saved file and move it from My documents to "Trash"
    navigationToolbar.navigateToDocuments()
    documentsPage.renameAndMoveLastSavedFileToTrash(this.letterInfo.newFileTitle)
    documentsTreePanel.elements.trashFolder().click()
    cy.get(`[title="${this.letterInfo.newFileTitle}.txt"]`).should('exist')
  })

  after(function () {
    BasePage.reloadPageAndWait()
    documentsPage.clearUploadedDocuments()
    documentsPage.clearTrashFolder()
    messagesPage.clearInboxFolder()
    messagesPage.clearSentFolder()
    messagesPage.clearTrashFolder()
    cy.deleteFixtureFile(this.letterInfo.letterFileName)
  })
})