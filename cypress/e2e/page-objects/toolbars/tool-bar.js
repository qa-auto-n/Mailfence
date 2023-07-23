class ToolBar {
    elements =
        {
            selectAllCheckbox: () => cy.get('[title = "Select all"] .icon'),
            refreshButton: () => cy.get('[title="Refresh"]'),
            etcButton: () => cy.get('#toolbar_more .icon-Etc'),
            deleteInTrashButton: () => cy.get('div[title="Delete"]')
        }

    clickRefreshButton(options = {}) {
        this.elements.refreshButton().click()
        const { timeout = null } = options
        if (timeout != null) {
            cy.wait(timeout)
        }
    }

    selectAllFiles() {
        this.elements.selectAllCheckbox().click({ force: true })
    }

    clickEtcButton() {
        this.elements.etcButton().click()
    }

    clickDeleteButtonInTrash() {
        this.elements.deleteInTrashButton().click()
    }
}

export default ToolBar