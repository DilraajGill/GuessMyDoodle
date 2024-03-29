describe("home e2e tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[type="text"]').type("userAccount");
    cy.get('input[type="password"]').type("Password!");
    cy.get('button[type="submit"]').click();
    cy.get(".bi-cart-fill").click();
  });
  it("loads the store page", () => {
    cy.get("h2").contains("Store");
    cy.get(".store-card").should("have.length.at.least", 14);
  });
  it("display modal if lacking funds", () => {
    cy.intercept("POST", "/store/buy/*", {
      statusCode: 400,
      body: "Not enough points",
    });
    cy.get(".store-card .btn-primary").first().click();
    cy.get(".modal").should("be.visible");
    cy.get(".modal-body").should(
      "contain",
      "You do not have enough money to purchase this item!"
    );
    cy.get(".modal .btn-secondary").click();
    cy.get(".modal").should("not.exist");
  });
  it("direct user to home page", () => {
    cy.get(".bi-house-fill").click();
    cy.url().should("include", "/home");
  });
});
