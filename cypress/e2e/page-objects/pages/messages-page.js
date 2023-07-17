import SaveInDocumentsWindow from "../modal-windows/save-in-documents-window"
import ConfirmDeletionWindow from "../modal-windows/confirm-deletion-window"
import ToolBar from "../toolbars/tool-bar"
import UserHomePage from "./user-home-page"

const saveInDocumentsWindow = new SaveInDocumentsWindow()
const confirmDeletionWindow = new ConfirmDeletionWindow()
const toolBar = new ToolBar()
const userHomePage = new UserHomePage()

class MessagesPage {
    elements =
        {
            inbox: () => cy.get('#treeInbox'),
            sentFolder: () => cy.get('#treeSend'),
            newButton: () => cy.get('#mailNewBtn'),
            mailTo: () => cy.get('#mailTo'),
            mailSubject: () => cy.get('#mailSubject'),
            contentIframe: () => cy.get('iframe[id^="gwt-uid-"]'),
            attachmentDropdown: () => cy.get('a:contains("Attachment")'),
            attachmentDropdownToolOption: () => cy.get('.menu a:contains("tool")'),
            addDocumentsOkButton: () => cy.get('#dialBtn_OK'),
            sendLetterButton: () => cy.get('#mailSend'),
            unreadLetters: () => cy.get('.listUnread'),
            attachmentArrowDown: () => cy.get('a > .icon-Arrow-down'),
            addedAttachment: () => cy.get('[_type="att"]'),
            deleteButton: () => cy.get('div[title="To Trash"]')
        }

    clickInbox(options = {}) {
        this.elements.inbox().click()
        const { timeout = null } = options
        if (timeout != null) {
            cy.wait(timeout)
        }
    }

    openNewLetterForm() {
        this.elements.newButton().click()
    }

    fillLetter(to, subject, content = '') {
        this.elements.mailTo().type(to).type('{enter}')
        this.elements.mailSubject().type(subject)
        this.elements.contentIframe().getIframeBody().type(content)
    }

    addAttachmentFromDocuments(fileName) {
        this.elements.attachmentDropdown().click()
        this.elements.attachmentDropdownToolOption().click()
        cy.get(`[title="${fileName}"]`).click()
        this.elements.addDocumentsOkButton().click()
    }

    sendLetter() {
        this.elements.sendLetterButton().click()
    }

    openLetter() {
        this.elements.unreadLetters().eq(0).click()
    }

    saveAttachmentInDocuments() {
        this.elements.attachmentArrowDown().click({ force: true })
        cy.contains('Save in Documents').click()
        saveInDocumentsWindow.chooseMyDocumentsAndClickSaveButton()
    }

    clearInboxFolder() {
        userHomePage.navigateToMessages()
        this.clickInbox()
        toolBar.clickRefreshButton({ timeout: 1000 })
        toolBar.selectAllFiles()
        this.elements.deleteButton().click()
    }

    clearSentFolder() {
        userHomePage.navigateToMessages()
        this.elements.sentFolder().click()
        toolBar.clickRefreshButton({ timeout: 1000 })
        toolBar.selectAllFiles()
        toolBar.clickEtcButton()
        this.elements.deleteButton().click()
    }

    clearTrashFolder() {
        userHomePage.navigateToMessages()
        cy.contains('Trash').click()
        toolBar.clickRefreshButton({ timeout: 1000 })
        toolBar.selectAllFiles()
        toolBar.clickEtcButton()
        toolBar.clickDeleteButtonInTrash()
        confirmDeletionWindow.clickYesBtn()
    }
}

export default MessagesPage