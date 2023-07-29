import MessagesTreePanel from "../page-components/messages-tree-panel"
import SaveInDocumentsWindow from "../page-components/save-in-documents-window"
import BasePage from "./base-page"
import NavigationToolBar from "../page-components/navigation-tool-bar"
import MessagesToolBar from "../page-components/messages-toolbar"
import ConfirmDeletionWindow from "../page-components/confirm-deletion-window"

const saveInDocumentsWindow = new SaveInDocumentsWindow()
const messagesTreePanel = new MessagesTreePanel()
const navigationToolbar = new NavigationToolBar()
const messagesToolbar = new MessagesToolBar()
const confirmDeletionWindow = new ConfirmDeletionWindow()

class MessagesPage extends BasePage {
    elements =
        {
            mailTo: () => cy.get('#mailTo'),
            mailSubject: () => cy.get('#mailSubject'),
            contentIframe: () => cy.get('iframe[id^="gwt-uid-"]'),
            attachmentDropdown: () => cy.get('a:contains("Attachment")'),
            attachmentDropdownToolOption: () => cy.get('.menu a:contains("tool")'),
            addDocumentsOkButton: () => cy.get('#dialBtn_OK'),
            unreadLetters: () => cy.get('.listUnread'),
            attachmentArrowDown: () => cy.get('a > .icon-Arrow-down'),
            addedAttachment: () => cy.get('[_type="att"]')
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

    openUnreadLetterByTitle(title) {
        this.elements.unreadLetters()
            .find('div.listSubject')
            .contains(title)
            .first()
            .click()
    }

    saveAttachmentInDocuments() {
        this.elements.attachmentArrowDown().click({ force: true })
        cy.contains('Save in Documents').click()
        saveInDocumentsWindow.elements.myDocuments().click()
        saveInDocumentsWindow.clickSaveButton()
    }

    clearInboxFolder() {
        navigationToolbar.navigateToMessages()
        messagesTreePanel.clickInbox()
        messagesToolbar.clickRefreshButton({ timeout: 1000 })
        messagesToolbar.elements.selectAllCheckbox().click()
        messagesToolbar.elements.deleteButton().click()
    }

    clearSentFolder() {
        navigationToolbar.navigateToMessages()
        messagesTreePanel.elements.sentFolder().click()
        messagesToolbar.clickRefreshButton({ timeout: 1000 })
        messagesToolbar.elements.selectAllCheckbox().click()
        messagesToolbar.elements.etcButton().click()
        messagesToolbar.elements.deleteButton().click()
    }

    clearTrashFolder() {
        navigationToolbar.navigateToMessages()
        cy.contains('Trash').click({ force: true })
        messagesToolbar.clickRefreshButton({ timeout: 1000 })
        messagesToolbar.elements.selectAllCheckbox().click()
        messagesToolbar.elements.etcButton().click()
        messagesToolbar.elements.deleteInTrashButton().click()
        confirmDeletionWindow.elements.yesButton().click()
    }
}

export default MessagesPage