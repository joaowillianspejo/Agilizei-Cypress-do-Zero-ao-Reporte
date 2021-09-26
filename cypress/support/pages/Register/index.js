const elements = require("./elements").ELEMENTS;

class Register {
  acessarCadastro() {
    cy.visit("http://localhost:3000/register");
  }
  preencherCadastro() {
    cy.get(elements.name).type("Nome da Ong");
    cy.get(elements.email).type("email@ong.com.br");
    cy.get(elements.whatsapp).type("13999999999");
    cy.get(elements.city).type("Santos");
    cy.get(elements.uf).type("SP");
  }
  validarCadastroOngComSucesso() {
    cy.intercept("POST", "**/ongs").as("postOng");

    cy.get(elements.submit).click();

    cy.wait("@postOng").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  }
}

export default new Register();
