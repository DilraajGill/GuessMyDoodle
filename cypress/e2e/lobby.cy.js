describe("lobby e2e tests", () => {
  beforeEach(async () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[type="text"]').type("userAccount");
    cy.get('input[type="password"]').type("Password!");
    cy.get('button[type="submit"]').click();
  });
});
