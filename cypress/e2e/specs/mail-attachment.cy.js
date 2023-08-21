import { v4 as uuidv4 } from 'uuid'
import { appendIdToFilename, extractFilenameWithoutExtension } from '../../support/filenameUtils'
import DashboardPage from "../page-objects/pages/dashboard-page"
import LoginPage from "../page-objects/pages/login-page"
import MailboxHomePage from '../page-objects/pages/mailbox-home-page'
import DocumentsPage from "../page-objects/pages/documents-page"
import MessagesPage from "../page-objects/pages/messages-page"

const dashboardPage = new DashboardPage()
const loginPage = new LoginPage()
const mailboxHomePage = new MailboxHomePage()
const documentsPage = new DocumentsPage()
const messagesPage = new MessagesPage()
const commonUniqueId = uuidv4().slice(0, 6);

describe('Mail Attachment', function () {
  let uniqueFileName
  let uniqueLetterSubject
  let documentsToCleanUp = []
  let lettersToCleanUp = []

  before(function () {
    cy.fixture('user-info').then(function (userData) {
      this.userData = userData
    })

    cy.fixture('letter-info').then(function (letterInfo) {
      this.letterInfo = letterInfo
      uniqueFileName = appendIdToFilename(letterInfo.documentFullName, commonUniqueId)
      uniqueLetterSubject = appendIdToFilename(letterInfo.subject, commonUniqueId)
      cy.generateFixtureFile(uniqueFileName, letterInfo.letterText)
    })
  })

  it('should send and receive an email with an attachment', function () {
    const email = Cypress.env('email')
    const password = Cypress.env('password')
    documentsToCleanUp.push(uniqueFileName)
    lettersToCleanUp.push(uniqueLetterSubject)

    // Log in
    cy.visit(Cypress.env('url'))
    dashboardPage.elements.loginButton().click()
    loginPage.login(email, password)
    mailboxHomePage.getUserName().then(function (actualName) {
      expect(actualName).to.equal(this.userData.name)
    })

    // Attach new .txt file
    documentsPage.uploadDocument(uniqueFileName)
    cy.get(`[title$="${uniqueFileName}"]`).should('exist')

    // Send email with attached file to myself
    messagesPage.sendLetter(email, uniqueLetterSubject, this.letterInfo.content, uniqueFileName)

    // Check that email received
    messagesPage.clickInbox({ timeout: 5000 }, true)
    messagesPage.elements.unreadLetters()
      .find('div.listSubject')
      .contains(uniqueLetterSubject)
      .should('exist')

    // Open received email and save the attached file to My Documents
    messagesPage.openUnreadLetterByTitle(uniqueLetterSubject)
    messagesPage.saveAttachmentInDocuments()

    // Open Documents and move just saved file from My documents to "Trash"
    documentsPage.moveLastSavedFileToTrash()
    documentsPage.navigateToTrashFolder()
    const filenameWithoutExtension = extractFilenameWithoutExtension(uniqueFileName);
    cy.get(`[title*="${filenameWithoutExtension}"]`).should('exist')
  })


  afterEach(function () {
    if (this.currentTest.state === "passed") {
      cy.reloadPageAndWait()

      if (documentsToCleanUp.length) {
        documentsPage.clearMyDocumentByTitle(documentsToCleanUp)
        documentsPage.clearTrashFolderByTitle(documentsToCleanUp)
        documentsToCleanUp = []
      }

      if (lettersToCleanUp.length) {
        messagesPage.clearInboxByLetterSubject(lettersToCleanUp)
        messagesPage.clearSentFolder(lettersToCleanUp)
        messagesPage.clearTrashFolder(lettersToCleanUp)
        lettersToCleanUp = []
      }

      cy.deleteFixtureFile(uniqueFileName)
    }
  })
})