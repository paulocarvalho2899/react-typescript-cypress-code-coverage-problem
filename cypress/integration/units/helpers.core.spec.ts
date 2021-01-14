/// <reference types="cypress" />

import { isObject } from "../../../src/helpers/coreHelper";

describe("Core Helpers", () => {
	it("Is Object", () => {
		expect(isObject({})).to.eq(true);
	});
});
