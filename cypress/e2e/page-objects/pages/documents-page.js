import NavigationToolbar from "../page-components/navigation-tool-bar"
import DocumentsTreePanel from "../page-components/documents-tree-panel"
import DocumentsToolBar from "../page-components/documents-toolbar"
import ConfirmDeletionWindow from "../page-components/confirm-deletion-window"

const navigationToolbar = new NavigationToolbar()
const documentsTreePanel = new DocumentsTreePanel()
const documentsToolBar = new DocumentsToolBar()
const confirmDeletionWindow = new ConfirmDeletionWindow()

class DocumentsPage {

    elements =
        {
            singleDocumentblock: () => cy.get('.trow'),
            docRenameOption: () => cy.get('#doc_rename'),
            docRenameInput: () => cy.get('#rename_input'),
            sortBy: () => cy.get('.sortBy')
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

    clearMyDocumentByTitle(fileNames) {
        navigationToolbar.elements.documentsButton().click()
        documentsTreePanel.elements.myDocuments().click()
        cy.wrap(fileNames).each(fileName => {
            let filenameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'))
            cy.get(`[title*="${filenameWithoutExtension}"]`).parents('tr').within(() => {
                cy.get('.checkIcon').click()
            })
        })
        documentsToolBar.elements.etcButton().click()
        documentsToolBar.elements.deleteButton().click()
    }

    clearTrashFolderByTitle(fileNames) {
        navigationToolbar.elements.documentsButton().click()
        documentsTreePanel.elements.trashFolder().click({ force: true })
        cy.wrap(fileNames).each(fileName => {
            let filenameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'))
            cy.get(`[title*="${filenameWithoutExtension}"]`).parents('tr').within(() => {
                cy.get('.checkIcon').click()
            })
        })
        documentsToolBar.elements.etcButton().click()
        documentsToolBar.elements.deleteInTrashButton().click()
        confirmDeletionWindow.elements.yesButton().click()
    }
}

export default DocumentsPage