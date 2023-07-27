import ToolBar from "../page-components/tool-bar"
import NavigationToolbar from "../page-components/navigation-tool-bar"

const toolBar = new ToolBar()
const navigationToolbar = new NavigationToolbar()

class DocumentsPage {
    elements =
        {
            singleDocumentblock: () => cy.get('.trow'),
            docRenameOption: () => cy.get('#doc_rename'),
            docRenameInput: () => cy.get('#rename_input'),
            deleteButton: () => cy.get('#doc_trash'),
            trashFolder: () => cy.get('div#doc_tree_trash'),
            sortBy: () => cy.get('.sortBy')
        }

    getUploadedFileNameByTitle(fileName) {
        return cy.get(`[title$="${fileName}"]`)
    }

    clearUploadedDocuments() {
        navigationToolbar.navigateToDocuments()
        cy.contains('My documents').click()
        toolBar.clickRefreshButton({ timeout: 1000 })
        toolBar.selectAllFiles()
        toolBar.clickEtcButton()
        this.elements.deleteButton().click()
    }

    renameAndMoveLastSavedFileToTrash(newTitle) {
        this.elements.sortBy().click()
        cy.contains('Date').click()
        this.elements.singleDocumentblock().eq(0).click()
        toolBar.clickEtcButton()
        this.elements.docRenameOption().click()
        this.elements.docRenameInput().type(newTitle).type('{enter}')
        cy.dragAndDrop(this.elements.singleDocumentblock().eq(0), this.elements.trashFolder())
    }
}

export default DocumentsPage