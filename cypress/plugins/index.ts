/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */

const browserify = require("@cypress/browserify-preprocessor");
module.exports = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config
	require("@cypress/react/plugins/react-scripts")(on, config);

	// custom tasks for sending and reporting code coverage
	require("@cypress/code-coverage/task")(on, config);

	// tell Cypress to use .babelrc file
	// and instrument the specs files
	// only the extra application files will be instrumented
	// not the spec files themselves
	const options = browserify.defaultOptions;
	options.browserifyOptions.transform[1][1].plugins.push("babel-plugin-istanbul");
	options.browserifyOptions.transform[1][1].babelrc = true;
	on("file:preprocessor", browserify({ ...options, typescript: require.resolve("typescript") }));

	on("before:browser:launch", (browser = {}, launchOptions) => {
		if (browser.name === "electron") {
			launchOptions.preferences["width"] = 1920;
			launchOptions.preferences["height"] = 1080;
			launchOptions.preferences["resizable"] = false;
			return launchOptions;
		}
		if (["chrome", "chromium"].includes(browser.name)) {
			// TODO replace existing argument if found
			// we should check if there is already an argument "--window-size"
			// and if it is found, replace it
			launchOptions.args.push(`--window-size=${1920},${1080}`);
			// movies and screenshots look better without scrollbars
			launchOptions.args.push("--hide-scrollbars");

			return launchOptions;
		}
	});

	// It's IMPORTANT to return the config object
	// with any changed environment variables
	return config;
};
