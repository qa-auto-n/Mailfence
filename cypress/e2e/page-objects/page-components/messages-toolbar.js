class MessagesToolBar {

    elements = {
        deleteButton: () => cy.get('div[title="To Trash"]'),
        newButton: () => cy.get('#mailNewBtn'),
        sendLetterButton: () => cy.get('#mailSend'),
        selectAllCheckbox: () => cy.get('.icon.icon-checkb'),
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
}

export default MessagesToolBar