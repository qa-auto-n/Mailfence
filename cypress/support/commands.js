import 'cypress-file-upload'

const path = require('path')

Cypress.Commands.add('uploadDocument', (filepath) => {
  cy.get('input[type="file"]').attachFile(filepath)
})

Cypress.Commands.add('generateFixtureFile', (fileName, content) => {
  const fixtureDirectory = Cypress.config('fixturesFolder')
  const filePath = path.join(fixtureDirectory, fileName)

  cy.writeFile(filePath, content)
})

Cypress.Commands.add('deleteFixtureFile', (fileName) => {
  const filePath = Cypress.config('fixturesFolder') + `/${fileName}`;
  cy.task('deleteFile', filePath);
})

Cypress.Commands.add('getIframeBody', { prevSubject: 'element' }, ($iframe) => {
  return new Cypress.Promise((resolve) => {
    resolve($iframe.contents().find('body'))
  })
})

Cypress.Commands.add("dragAndDrop", (subject, target) => {
  Cypress.log({
    name: "DRAGNDROP",
    message: `Dragging element ${subject} to ${target}`,
    consoleProps: () => {
      return {
        subject: subject,
        target: target,
      }
    }
  })
  subject.trigger("mousedown", { button: 0 }).trigger("mousemove", { clientX: 100, clientY: 100 })
  target.trigger("mousemove", { clientX: 100, clientY: 100 }).trigger("mouseup", { force: true })
})

Cypress.Commands.add('reloadPageAndWait', () => {
  cy.reload().then(() => {
    cy.get('i').then(($el) => {
      if ($el.is(':visible')) {
        cy.log('Spinner is still be visible but it is not relevant')
        cy.wait(5000)
      } else {
        cy.get('i').should('not.be.visible')
      }
    })
  }
  )
})

