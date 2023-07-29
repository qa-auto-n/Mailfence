import NavigationToolbar from "../page-components/navigation-tool-bar"
import BasePage from "./base-page"
import DocumentsTreePanel from "../page-components/documents-tree-panel"
import DocumentsToolBar from "../page-components/documents-toolbar"
import ConfirmDeletionWindow from "../page-components/confirm-deletion-window"

const navigationToolbar = new NavigationToolbar()
const documentsTreePanel = new DocumentsTreePanel()
const documentsToolBar = new DocumentsToolBar()
const confirmDeletionWindow = new ConfirmDeletionWindow()

class DocumentsPage extends BasePage {
    elements =
        {
            singleDocumentblock: () => cy.get('.trow'),
            docRenameOption: () => cy.get('#doc_rename'),
            docRenameInput: () => cy.get('#rename_input'),
            sortBy: () => cy.get('.sortBy')
        }

    getUploadedFileNameByTitle(fileName) {
        return cy.get(`[title$="${fileName}"]`)
    }

    clearUploadedDocuments() {
        navigationToolbar.navigateToDocuments()
        cy.contains('My documents').click()
        documentsToolBar.clickRefreshButton({ timeout: 1000 })
        documentsToolBar.elements.selectAllCheckbox().click()
        documentsToolBar.elements.etcButton().click()
        documentsToolBar.elements.deleteButton().click()
    }

    renameAndMoveLastSavedFileToTrash(newTitle) {
        this.elements.sortBy().click()
        cy.contains('Date').click()
        this.elements.singleDocumentblock().eq(0).click()
        documentsToolBar.elements.etcButton().click()
        this.elements.docRenameOption().click()
        this.elements.docRenameInput().type(newTitle).type('{enter}')
        cy.dragAndDrop(this.elements.singleDocumentblock().eq(0), documentsTreePanel.elements.trashFolder())
    }

    clearTrashFolder() {
        navigationToolbar.navigateToDocuments()
        cy.contains('Trash').click({ force: true })
        documentsToolBar.clickRefreshButton({ timeout: 1000 })
        documentsToolBar.elements.selectAllCheckbox().click()
        documentsToolBar.elements.etcButton().click()
        documentsToolBar.elements.deleteInTrashButton().click()
        confirmDeletionWindow.elements.yesButton().click()
    }
}

export default DocumentsPage