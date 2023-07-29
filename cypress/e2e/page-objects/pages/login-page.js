class LoginPage {
    elements =
        {
            emailField: () => cy.get('[name="UserID"]'),
            passwordField: () => cy.get('[name="Password"]'),
            submitButton: () => cy.get('[type="submit"]')
        }

    login(email, password) {
        this.elements.emailField().type(email)
        this.elements.passwordField().type(password)
        this.elements.submitButton().click()
    }
}

export default LoginPage