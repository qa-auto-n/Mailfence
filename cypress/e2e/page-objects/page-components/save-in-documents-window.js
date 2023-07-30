class SaveInDocumentsWindow {

    elements = {
        myDocuments: () => cy.get('.treeItemLabel:contains("My documents"):visible'),
        saveButton: () => cy.get('#dialBtn_OK:visible')
    }
}

export default SaveInDocumentsWindow