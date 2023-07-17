class UserHomePage
{
    elements =
    {
        userSection : () => cy.get('.user > span'),
        documentsButton : () => cy.get('div#nav-docs'),
        messagesButton : () => cy.get('div#nav-mail')
    }

    navigateToDocuments()
    {
        this.elements.documentsButton().click()
    }

    navigateToMessages()
    {
        this.elements.messagesButton().click()
    }
}

export default UserHomePage