class DashboardPage
{
    elements =
    {
        loginButton: () => cy.get('#signin')
    }

    clickLoginButton()
    {
        this.elements.loginButton().click()
    }
}

export default DashboardPage