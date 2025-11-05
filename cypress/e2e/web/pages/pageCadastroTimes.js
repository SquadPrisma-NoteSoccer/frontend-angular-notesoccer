
export function clicarBtnCadastrarTimes(nomeBtn) {
    cy.get('[data-cy="btn-teams"]').should('be.visible').and('contain', nomeBtn).click();
};

export function cadastrarNomeLiga(nomeLiga) {
    cy.get('[data-cy="input-league"]').type(nomeLiga);
};

export function cadastrarNomeTime(nomeTime) {
    cy.get('[data-cy="input-name-team"]').type(nomeTime);
    cy.get('[data-cy="btn-add-team"] i.fa-plus').click();
};

export function cadastrarMultiplosTimes(nomeArqFixtures) {

    cy.fixture(nomeArqFixtures).then((dados) => {
        // 'dados.times' é o array dentro do JSON
        dados.times.forEach((nomeTime) => {
            cy.get('[data-cy="input-name-team"]').type(nomeTime);
            cy.get('[data-cy="btn-add-team"] i.fa-plus').click();
            // Aguarda o campo ser limpo para o próximo cadastro
            cy.get('[data-cy="input-name-team"]').should('have.value', '');
        });
    });
}


export function removerTime(nomeTime) {
    cy.contains('[data-cy="team-list"] li', nomeTime)
        // Dentro desse item, procura o botão de remover (ícone de X)
        .find('i.fa-solid.fa-xmark').click();
}

export function verificarRemocaoTime(nomeTime) {
    cy.contains('[data-cy="team-list"] li', nomeTime)
        .should('not.exist');
}