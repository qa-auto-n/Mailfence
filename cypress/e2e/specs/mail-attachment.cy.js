import DashboardPage from "../page-objects/pages/dashboard-page"
import LoginPage from "../page-objects/pages/login-page"
import NavigationToolbar from "../page-objects/page-components/navigation-tool-bar"
import DocumentsPage from "../page-objects/pages/documents-page"
import MessagesPage from "../page-objects/pages/messages-page"
import MessagesTreePanel from "../page-objects/page-components/messages-tree-panel"
import MessagesToolBar from "../page-objects/page-components/messages-toolbar"
import DocumentsTreePanel from "../page-objects/page-components/documents-tree-panel"
import { generateUniqueFilename } from '../../support/filenameUtils'

const dashboardPage = new DashboardPage()
const loginPage = new LoginPage()
const navigationToolbar = new NavigationToolbar()
const documentsPage = new DocumentsPage()
const messagesPage = new MessagesPage()
const messagesTreePanel = new MessagesTreePanel()
const messagesToolbar = new MessagesToolBar()
const documentsTreePanel = new DocumentsTreePanel()

describe('Mail Attachment', function () {
  let uniqueFileName
  let uniqueLetterSubject
  let uniqueNewFileName

  before(function () {
    cy.fixture('user-info').then(function (userData) {
      this.userData = userData
    })

    cy.fixture('letter-info').then(function (letterInfo) {
      this.letterInfo = letterInfo
      uniqueFileName = generateUniqueFilename(letterInfo.letterFileName)
      uniqueLetterSubject = generateUniqueFilename(letterInfo.subject)
      uniqueNewFileName = generateUniqueFilename(letterInfo.newFileTitle)
      cy.generateFixtureFile(uniqueFileName, letterInfo.letterText)
    })
  })

  it('should send and receive an email with an attachment', function () {
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    // Log in
    cy.visit(Cypress.env('url'))
    dashboardPage.elements.loginButton().click()
    loginPage.login(email, password)
    navigationToolbar.elements.userSection().then(function (name) {
      const actualName = name.text()
      expect(actualName).to.equal(this.userData.name)
    })

    // Attach new .txt file
    navigationToolbar.elements.documentsButton().click()
    cy.uploadDocument(uniqueFileName)
    cy.get(`[title$="${uniqueFileName}"]`).should('be.visible')

    // Send email with attached file to myself
    navigationToolbar.elements.messagesButton().click()
    messagesToolbar.elements.newButton().click()
    messagesPage.fillLetter(email, uniqueLetterSubject, this.letterInfo.content)
    messagesPage.addAttachmentFromDocuments(uniqueFileName)
    messagesPage.elements.addedAttachment().should('contain', uniqueFileName)
    messagesToolbar.elements.sendLetterButton().click()

    // Check that email recieved
    messagesTreePanel.clickInbox({ timeout: 5000 })
    messagesToolbar.elements.refreshButton().click()
    messagesPage.elements.unreadLetters()
      .find('div.listSubject')
      .contains(uniqueLetterSubject)
      .should('exist')

    // Open recieved email and save the attached file to My Documents
    messagesPage.openUnreadLetterByTitle(uniqueLetterSubject)
    messagesPage.saveAttachmentInDocuments()

    // Open Documents, rename just saved file and move it from My documents to "Trash"
    navigationToolbar.elements.documentsButton().click()
    documentsPage.renameAndMoveLastSavedFileToTrash(uniqueNewFileName)
    documentsTreePanel.elements.trashFolder().click()
    cy.get(`[title="${uniqueNewFileName}.txt"]`).should('exist')
  })

  after(function () {
    cy.reloadPageAndWait()
    documentsPage.clearMyDocumentByTitle([uniqueFileName])
    documentsPage.clearTrashFolderByTitle([uniqueFileName, uniqueNewFileName])
    messagesPage.clearInboxByLetterSubject([uniqueLetterSubject])
    messagesPage.clearSentFolder([uniqueLetterSubject])
    messagesPage.clearTrashFolder([uniqueLetterSubject])
    cy.deleteFixtureFile(uniqueFileName)
  })
})