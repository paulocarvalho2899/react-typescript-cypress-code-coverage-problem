/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="cypress" />

describe("Example", () => {
	it("Test button", () => {
		cy.visit("http://localhost:3000");

		cy.get("button").click();
		cy.get("#showMessage").contains("Test");
	});
});
