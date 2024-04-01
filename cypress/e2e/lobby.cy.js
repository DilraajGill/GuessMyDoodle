describe("lobby e2e tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[type="text"]').type("userAccount");
    cy.get('input[type="password"]').type("Password!");
    cy.get('button[type="submit"]').click();
  });
  it("create a new lobby", () => {
    cy.intercept("POST", "/create-lobby").as("createLobby");
    cy.get("button").contains("Create Lobby!").click();
    cy.wait("@createLobby").then((interception) => {
      const lobbyId = interception.response.body.lobbyId;
      cy.url().should("include", `/lobby/${lobbyId}`);
    });
  });
  it("display form items", () => {
    cy.get("button").contains("Create Lobby!").click();
    cy.get("form").should("be.visible");
    cy.contains("Lobby Type").should("be.visible");
    cy.contains("Number of Rounds").should("be.visible");
    cy.contains("Number of Minutes").should("be.visible");
    cy.contains("Custom Words").should("be.visible");
  });
  it("change settings", () => {
    cy.get("button").contains("Create Lobby!").click();
    cy.get('[data-testid="round-updates"]').invoke("val", 3).trigger("change");
    cy.get('[data-testid="timer-update"]').invoke("val", 2).trigger("change");
  });
  it("disabled button if only one player", () => {
    cy.get("button").contains("Create Lobby!").click();
    cy.get("button").contains("Start Game").should("be.disabled");
  });
});
