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
  it("purchase item from shop", () => {
    cy.intercept("POST", "/store/buy/*").as("buyIcon");
    cy.get(".profile-username").click();
    cy.contains("Change Icon").click();
    cy.document().then((doc) => {
      const $availableItems = Cypress.$("[data-testid='available']", doc);
      const length = $availableItems.length;
      cy.wrap(length).as("lengthItems");
    });

    cy.get(".btn-close").click();
    cy.document().then((doc) => {
      const $buttons = Cypress.$('button:contains("Already Own")', doc);
      const buttonsLength = $buttons.length;
      cy.wrap(buttonsLength).as("ownLength");
    });

    cy.task("updateUserPoints", { username: "userAccount", points: 5000 });
    cy.contains("button", "5,000 Points").first().click();
    cy.wait("@buyIcon").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.get("@ownLength").then((count) => {
      cy.get("button")
        .filter(':contains("Already Own")')
        .should(($newCount) => {
          expect($newCount.length).to.eq(count + 1);
        });
    });
    cy.get(".profile-username").click();
    cy.contains("Change Icon").click();
    cy.get("[data-testid='selected']").should("have.length", 1);
    cy.get("@lengthItems").then((count) => {
      cy.get("[data-testid='available']").should("have.length", count + 1);
    });
  });
  it("direct user to home page", () => {
    cy.get(".bi-house-fill").click();
    cy.url().should("include", "/home");
  });
});
