/// <reference types='cypress'/>

import Register from "../support/pages/Register";
import Logon from "../support/pages/Logon";
import Profile from "../support/pages/Profile";
import NewIncident from "../support/pages/NewIncident";

describe("Ongs", () => {
  it("deve poder realizar um cadastro", () => {
    Register.acessarCadastro();

    Register.preencherCadastro();

    Register.validarCadastroOngComSucesso();
  });

  it("deve poder realizar um login no sistema", () => {
    cy.createOng();

    Logon.acessarLogin();

    Logon.preencherLogin();
  });

  it("deve poder realizar o logout", () => {
    cy.createOng();
    cy.login();

    Profile.realizarLogout();
  });

  it("deve poder cadastrar um novo caso", () => {
    cy.createOng();
    cy.login();

    Profile.selecionarCadastrarNovoCaso();

    NewIncident.preencherNovoIncidente();

    NewIncident.validarCriacaoDeNovoIncidente();
  });

  it("deve pode excluir um caso existente", () => {
    cy.createOng();
    cy.createNewIncident();
    cy.login();

    Profile.deletarIncidente();
  });
});
