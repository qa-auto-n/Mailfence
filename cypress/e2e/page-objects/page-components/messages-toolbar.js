class MessagesToolBar {

    elements = {
        deleteButton: () => cy.get('div[title="To Trash"]'),
        newButton: () => cy.get('#mailNewBtn'),
        sendLetterButton: () => cy.get('#mailSend')
    }
}

export default MessagesToolBar