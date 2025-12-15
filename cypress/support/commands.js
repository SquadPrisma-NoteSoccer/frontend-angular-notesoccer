// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('cadastroOrganizador', (nomeArqFixtures) => {

    cy.verificarDescricaoHomePage('Gerencie ligas de futebol amador com facilidade: cadastre times, agende jogos, defina arenas e horários. Compartilhe as partidas diretamente com sua galera no WhatsApp.');
    cy.clicarBtnAcessar('Acesse agora!');
    cy.verificarUrl('/signup');
    pageCadastroOrganizador.preencherFormularioOrganizador(nomeArqFixtures);
    pageCadastroOrganizador.clicarBtnCadastrar('Cadastre-se');
    cy.verificarUrl('/signup-success');
    pageCadastroOrganizador.validarPageCadastroSucesso('Vamos para os próximos passos');

})

Cypress.Commands.add('verificarDescricaoHomePage', (msgDescricao) => {
    cy.get('[data-cy="welcome-text"]')
        .should('be.visible')
        .and('contain.text', msgDescricao); // Verificar se está visível a descrição de início do site
});


Cypress.Commands.add('clicarBtnAcessar', (nomeBtn) => {
    cy.get('[data-cy="btn-access"]').should('be.visible').and('contain.text', nomeBtn).click() // Verificar se botão está visível e contém o nome determinado e clicar
})

Cypress.Commands.add('verificarUrl', (includeUrl) => { cy.url().should('include', includeUrl); });

// Cypress.Commands.add('login', (email, password) => { ... })
