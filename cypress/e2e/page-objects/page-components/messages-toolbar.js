class MessagesToolBar {

    elements = {
        deleteButton: () => cy.get('div[title="To Trash"]'),
        newButton: () => cy.get('#mailNewBtn'),
        sendLetterButton: () => cy.get('#mailSend'),
        refreshButton: () => cy.get('[title="Refresh"]'),
        etcButton: () => cy.get('#toolbar_more .icon-Etc'),
        deleteInTrashButton: () => cy.get('div[title="Delete"]')
    }
}

export default MessagesToolBar