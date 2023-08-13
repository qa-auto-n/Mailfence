class MessagesTreePanel {

    elements = {
        inboxFolder: () => cy.get('#treeInbox'),
        sentFolder: () => cy.get('#treeSend'),
        trashFolder: () => cy.get('[ti="1"]:nth-of-type(3)')
    }
}

export default MessagesTreePanel