/// <reference types="cypress" />

describe('Ongs', () => {
  it('should register', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('[data-cy=name]').type('Dear Dogs');
    cy.get('[data-cy=email]').type('dogs@mail.com');
    cy.get('[data-cy=whatsapp]').type('5511912345678');
    cy.get('[data-cy=city]').type('São Paulo');
    cy.get('[data-cy=uf]').type('SP');

    cy.route('POST', '**/ongs').as('postOng');

    cy.get('[data-cy=submit]').click();
    cy.wait('@postOng').then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property('id');
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it('should login', () => {
    const createdOngId = Cypress.env('createdOngId');

    cy.visit('http://localhost:3000');
    cy.get('input').type(createdOngId);
    cy.get('.button').click();
  });
});
