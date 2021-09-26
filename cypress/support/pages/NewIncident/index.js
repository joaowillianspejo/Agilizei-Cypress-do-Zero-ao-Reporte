const elements = require("./elements").ELEMENTS;

class NewIncident {
  preencherNovoIncidente() {
    cy.get(elements.title).type("Animal abandonado");
    cy.get(elements.description).type(
      "Animal precisa de apoio para ter uma moradia."
    );
    cy.get(elements.value).type(200);
  }

  validarCriacaoDeNovoIncidente() {
    cy.intercept("POST", "**/incidents").as("newIncident");

    cy.get(elements.submit).click();

    cy.wait("@newIncident").then((xhr) => {
      expect(xhr.response.statusCode).be.eq(200);
      expect(xhr.response.body).has.property("id");
      expect(xhr.response.body.id).is.not.null;
    });
  }
}

export default new NewIncident();
