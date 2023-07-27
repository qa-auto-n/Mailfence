class SaveInDocumentsWindow {

    elements = {
        myDocuments: () => cy.get('.treeItemLabel:contains("My documents"):visible'),
        saveButton: () => cy.get('#dialBtn_OK:visible')
    }

    clickSaveButton() {
        this.elements.saveButton().should("not.contain.class", "GCSDBRWBMB").click()
    }
}

export default SaveInDocumentsWindow