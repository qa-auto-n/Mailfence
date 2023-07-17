class ConfirmDeletionWindow {

    elements = {
        yesButton: () => cy.get('#dialBtn_YES:visible'),
        confirmationWindow:() => cy.get('#msgBox')
    }
    
    clickYesBtn() {
        this.elements.yesButton().click()
    }
}

export default ConfirmDeletionWindow