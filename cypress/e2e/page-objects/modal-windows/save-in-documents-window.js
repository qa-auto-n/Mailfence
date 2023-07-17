class SaveInDocumentsWindow {

    elements = {
        myDocuments: () => cy.get('.GCSDBRWBJY .treeItemRoot > .treeItemLabel'),
        saveButton:() => cy.get('#dialBtn_OK:visible')
    }
    
    chooseMyDocumentsAndClickSaveButton() {
        this.elements.myDocuments().click()
        this.elements.saveButton().should("not.contain.class", "GCSDBRWBMB").click()
    }
}

export default SaveInDocumentsWindow