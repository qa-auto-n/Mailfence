import DashboardPage from "../page-objects/pages/dashboard-page"
import LoginPage from "../page-objects/pages/login-page"
import NavigationToolbar from "../page-objects/page-components/navigation-tool-bar"
import DocumentsPage from "../page-objects/pages/documents-page"
import MessagesPage from "../page-objects/pages/messages-page"
import ToolBar from "../page-objects/page-components/tool-bar"
import Destination from "../page-objects/enums/destination"

const dashboardPage = new DashboardPage()
const loginPage = new LoginPage()
const navigationToolbar = new NavigationToolbar()
const documentsPage = new DocumentsPage()
const messagesPage = new MessagesPage()
const toolBar = new ToolBar()

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
    messagesPage.elements.newButton().click()
    messagesPage.fillLetter(email, this.letterInfo.subject, this.letterInfo.content)
    messagesPage.addAttachmentFromDocuments(this.letterInfo.letterFileName)
    messagesPage.elements.addedAttachment().should('contain', this.letterInfo.letterFileName)
    messagesPage.elements.sendLetterButton().click()

    // Check that email recieved
    messagesPage.clickInbox({ timeout: 5000 })
    toolBar.clickRefreshButton()
    messagesPage.elements.unreadLetters().eq(0).should('contain', this.letterInfo.subject)

    // Open recieved email and save the attached file to My Documents
    messagesPage.openLetter()
    messagesPage.saveAttachmentInDocuments()

    // Open Documents, rename just saved file and move it from My documents to "Trash"
    navigationToolbar.navigateToDocuments()
    documentsPage.renameAndMoveLastSavedFileToTrash(this.letterInfo.newFileTitle)
    documentsPage.elements.trashFolder().click()
    cy.get(`[title="${this.letterInfo.newFileTitle}.txt"]`).should('exist')
  })

  after(function () {
    navigationToolbar.reloadPageAndWait()
    documentsPage.clearUploadedDocuments()
    navigationToolbar.clearTrashFolder(Destination.DOCUMENTS)
    messagesPage.clearInboxFolder()
    messagesPage.clearSentFolder()
    navigationToolbar.clearTrashFolder(Destination.MESSAGES)
    cy.deleteFixtureFile(this.letterInfo.letterFileName)
  })
})