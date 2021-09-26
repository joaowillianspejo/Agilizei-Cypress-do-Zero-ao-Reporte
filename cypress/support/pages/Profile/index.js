const elements = require("./elements").ELEMENTS;

class Profile {
  realizarLogout() {
    cy.get(elements.logout).click();
  }

  selecionarCadastrarNovoCaso() {
    cy.get(elements.newIncident).click();
  }

  deletarIncidente() {
    cy.intercept("DELETE", "**/incidents/*").as("deleteIncident");

    cy.get(elements.deleteIncident).click();

    cy.wait("@deleteIncident").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(204);
      expect(xhr.response.body).to.be.empty;
    });
  }
}

export default new Profile();
