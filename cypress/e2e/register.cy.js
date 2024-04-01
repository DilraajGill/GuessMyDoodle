describe("register e2e tests", () => {
  before(() => {
    cy.task("deleteUser", { username: "userAccount" });
  });

  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("load form", () => {
    cy.get("form").should("exist");
  });

  it("valid button with valid fields", () => {
    cy.get('input[type="email"]').type("test@gmail.com");
    cy.get('input[type="text"]').type("userAccount");
    cy.get('input[type="password"]').first().type("Password!");
    cy.get('input[type="password"]').eq(1).type("Password!");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/home");
  });
  it("invalid fields after the first creation", () => {
    cy.get('input[type="email"]').type("test@gmail.com");
    cy.get('input[type="text"]').type("userAccount");
    cy.get('input[type="password"]').first().type("Password!");
    cy.get('input[type="password"]').eq(1).type("Password!");
    cy.get('button[type="submit"]').click();
    cy.contains("Email is already in use!").should("be.visible");
    cy.contains("Username is already in use").should("be.visible");
  });
});
