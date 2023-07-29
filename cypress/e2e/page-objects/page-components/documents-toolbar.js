class DocumentsToolBar {

    elements = {
        deleteButton: () => cy.get('#doc_trash'),
        deleteInTrashButton: () => cy.get('div[title="Delete"]'),
        etcButton: () => cy.get('#toolbar_more .icon-Etc')
    }
}

export default DocumentsToolBar