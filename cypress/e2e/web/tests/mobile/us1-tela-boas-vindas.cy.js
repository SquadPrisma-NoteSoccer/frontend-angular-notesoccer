import { formatoTelaMobile } from "../../../../support/viewports";

beforeEach(() => {
    cy.viewport( formatoTelaMobile.android_maioria_modernos[0], formatoTelaMobile.android_maioria_modernos[1] );
    cy.visit('/');
    
});
describe('Feature/ US1 - Telas de boas Vindas', () => {
    it('TC-US1-02 - Validar Botão Acesse Agora', () => {
        cy.verificarDescricaoHomePage('Gerencie ligas de futebol amador com facilidade: cadastre times, agende jogos, defina arenas e horários. Compartilhe as partidas diretamente com sua galera no WhatsApp.');
        cy.clicarBtnAcessar('Acesse agora!');
        cy.verificarUrl('/signup');
    });
});