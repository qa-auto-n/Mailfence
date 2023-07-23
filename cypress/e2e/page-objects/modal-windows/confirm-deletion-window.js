class ConfirmDeletionWindow {

    elements = {
        yesButton: () => cy.get('#dialBtn_YES')
    }

    clickYesBtn() {
        this.elements.yesButton().click()
    }
}

export default ConfirmDeletionWindow