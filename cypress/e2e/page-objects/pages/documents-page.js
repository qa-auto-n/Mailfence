import { extractFilenameWithoutExtension } from '../../../support/filenameUtils'
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
            singleDocumentBlock: () => cy.get('.trow'),
            sortByElement: () => cy.get('.sortBy')
        }

    uploadDocument(filepath) {
        navigationToolbar.elements.documentsButton().click()
        cy.get('#new_doc input[type="file"]').attachFile(filepath)
    }

    moveLastSavedFileToTrash() {
        navigationToolbar.elements.documentsButton().click()
        this.elements.sortByElement().click()
        cy.contains('Date').click()
        this.elements.singleDocumentBlock().eq(0).click()
        cy.dragAndDrop(this.elements.singleDocumentBlock().eq(0), documentsTreePanel.elements.trashFolder())
    }

    navigateToTrashFolder() {
        documentsTreePanel.elements.trashFolder().click()
    }

    clearMyDocumentByTitle(fileNames) {
        navigationToolbar.elements.documentsButton().click()
        documentsTreePanel.elements.myDocumentsFolder().click()
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
        documentsTreePanel.elements.myDocumentsArrowIcon().click()
        documentsTreePanel.elements.trashFolder().click()

        cy.wrap(fileNames).each(fileName => {
            const filenameWithoutExtension = extractFilenameWithoutExtension(fileName)
            cy.get(`[title*="${filenameWithoutExtension}"]`).each($element => {
                cy.wrap($element).parents('tr').within(() => {
                    cy.get('.checkIcon').click()
                })
            })
        })

        documentsToolBar.elements.etcButton().click()
        documentsToolBar.elements.deleteInTrashButton().click()
        confirmDeletionWindow.elements.yesButton().click()
    }
}

export default DocumentsPage