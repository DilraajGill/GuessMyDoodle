describe("home e2e tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[type="text"]').type("userAccount");
    cy.get('input[type="password"]').type("Password!");
    cy.get('button[type="submit"]').click();
  });

  it("display necessary information", () => {
    cy.get(".profile-picture").should("be.visible");
    cy.get(".profile-username").contains("userAccount");
  });

  it("will display no present lobbies", () => {
    cy.get(".room-container").should("be.visible");
    cy.contains("No Lobbies Available").should("be.visible");
  });
  it("allows signing out", () => {
    cy.intercept("GET", "/auth/sign-out", {
      statusCode: 200,
      body: { auth: false },
    }).as("signOut");

    cy.get(".profile-username").click();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.contains("Sign Out").click();
    cy.wait("@signOut");
    cy.url().should("include", "/login");
  });
  it("display lobby information", () => {
    cy.intercept("GET", "/get-public", {
      statusCode: 200,
      body: [
        {
          id: "ABCDE",
          icon: "../1.jpg",
          playerCount: 1,
          host: "Dilraaj",
        },
      ],
    }).as("loadLobbies");
    cy.wait("@loadLobbies");
    cy.get(".room-container").should("contain", "Dilraaj");
    cy.get(".room-container").should("contain", "Players: 1");
    cy.get(".room-container").should("contain", "#ABCDE");
  });
  it("display modal of available pictures", () => {
    cy.get(".profile-username").click();
    cy.contains("Change Icon").click();
    cy.get(".picture-body").should("be.visible");
    cy.get(".modal-title").should("contain", "Update Picture");
  });
});
