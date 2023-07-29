import BasePage from "./base-page"

class DashboardPage extends BasePage {
    elements =
        {
            loginButton: () => cy.get('#signin')
        }

    clickLoginButton() {
        this.elements.loginButton().click()
    }
}

export default DashboardPage