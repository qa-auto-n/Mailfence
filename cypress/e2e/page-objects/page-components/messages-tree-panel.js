class MessagesTreePanel {

    elements = {
        inbox: () => cy.get('#treeInbox'),
        sentFolder: () => cy.get('#treeSend'),
        trashFolder: () => cy.get('[ti="1"]:nth-of-type(3)')
    }

    clickInbox(options = {}) {
        this.elements.inbox().click()
        const { timeout = null } = options
        if (timeout != null) {
            cy.wait(timeout)
        }
    }
}

export default MessagesTreePanel