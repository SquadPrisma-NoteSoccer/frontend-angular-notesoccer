describe('NoteSoccer App', () => {
  it('should display the app', () => {
    cy.visit('/')
    cy.get('app-root').should('exist')
  })
})
