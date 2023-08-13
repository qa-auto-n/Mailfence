class SaveInDocumentsWindow {

    elements = {
        myDocumentsFolder: () => cy.get('.treeItemLabel:contains("My documents"):visible'),
        saveButton: () => cy.get('#dialBtn_OK:visible')
    }
}

export default SaveInDocumentsWindow