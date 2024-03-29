describe("login e2e tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("load form", () => {
    cy.get("form").should("exist");
  });

  it("valid button with valid fields", () => {
    cy.get('input[type="text"]').type("userAccount");
    cy.get('input[type="password"]').type("Password!");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/home");
  });

  it("should not proceed further", () => {
    cy.get('input[type="text"]').type("userAccount");
    cy.get('input[type="password"]').type("wrongPassword!");
    cy.get('button[type="submit"]').click();

    cy.contains("Invalid username or password").should("be.visible");
  });
});
