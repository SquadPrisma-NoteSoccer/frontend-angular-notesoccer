import * as pageCadastroTimes from '../pages/pageCadastroTimes';
describe('US4 - Cadastro de times na liga', () => {

    beforeEach(() => {
        cy.visit('/');
    });
    it('TC-US4-05  Inclusão de múltiplos times', () => {

        cy.cadastroOrganizador('organizadorVitor');
        pageCadastroTimes.clicarBtnCadastrarTimes('Cadastrar times');
        pageCadastroTimes.cadastrarNomeLiga('Liga UPU');
        pageCadastroTimes.cadastrarMultiplosTimes('timesAmadoresComMetade');
    });

    it('TC-US4-07 Remover um time', () => {

        cy.cadastroOrganizador('organizadorVitor');
        pageCadastroTimes.clicarBtnCadastrarTimes('Cadastrar times');
        pageCadastroTimes.cadastrarNomeLiga('Liga UPU');
        pageCadastroTimes.cadastrarMultiplosTimes('timesAmadoresComMetade');
        pageCadastroTimes.removerTime('Jardim Santa Marta');
        pageCadastroTimes.verificarRemocaoTime('Jardim Santa Marta');
    });

    it('TC-US4-XX limite 20 times por liga', () => {
        cy.cadastroOrganizador('organizadorVitor');
        pageCadastroTimes.clicarBtnCadastrarTimes('Cadastrar times');
        pageCadastroTimes.cadastrarNomeLiga('Liga UPU');
        pageCadastroTimes.cadastrarMultiplosTimes('timesAmadoresExcedidoLimite');
    });


});