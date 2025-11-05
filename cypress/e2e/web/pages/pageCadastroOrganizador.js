export function preencherFormularioOrganizador(nomeArqFixtures) {
    
  cy.fixture(nomeArqFixtures).then((organizador) => {
    cy.get('[data-cy="input-name"]').type(organizador.nome)
    cy.get('[data-cy="input-nickname"]').type(organizador.apelido)
    cy.get('[data-cy="input-email"]').type(organizador.email)
    cy.get('[data-cy="input-whatsapp"]').type(organizador.whatsapp)
    cy.get('[data-cy="input-password"]').type(organizador.senha)
  }) // vai pegar o json que está no fixtures e preencher as informações do formulário,  onde o nome do arquivo json será chamado no teste, assim para reaproveitamento de código para diversas contas de organizador fixos. 
};

export function clicarBtnCadastrar(nomeBtn) {
  cy.get('[data-cy="signup-btn"]').should('be.visible').and('contain', nomeBtn).click();

};

export function validarPageCadastroSucesso(msgDescricao){
  cy.get('[data-cy="success-text"]').should('be.visible').and('contain', msgDescricao);
}