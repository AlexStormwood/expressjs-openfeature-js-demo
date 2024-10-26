const fs = require("node:fs/promises");
const path = require("node:path");

const { OpenFeature, InMemoryProvider } = require('@openfeature/server-sdk');

const openFeatureClient = OpenFeature.getClient();

/**
 * An ExpressJS middleware function that will read a local file for raw flag data and configure the OpenFeature client to use that flag data.
 * @author Alex Stormwood
 */
const setUpFlagProvider = async (request, response, next) => {
	let flagFile = await fs.readFile(path.resolve("flags.json"), "utf8");
	await OpenFeature.setProviderAndWait(new InMemoryProvider(JSON.parse(flagFile)));
	response.flags = {}
	next();
}


/**
 * An ExpressJS middleware function that will use an established OpenFeature client to check the value of the "banana" feature flag.
 * @author Alex Stormwood
 */
const checkBananaFlag = async (request, response, next) => {
	let flagName = "banana";
	const bananaFlagValue = await openFeatureClient.getBooleanValue(flagName, false);
	response.flags[flagName] = bananaFlagValue;
	next();
}


module.exports = {
	setUpFlagProvider, 
	checkBananaFlag
}