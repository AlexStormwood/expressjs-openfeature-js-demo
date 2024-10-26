const fs = require("node:fs/promises");
const path = require("node:path");

const { OpenFeature, InMemoryProvider } = require('@openfeature/server-sdk');

const openFeatureClient = OpenFeature.getClient();

const setUpFlagProvider = async (request, response, next) => {
	let flagFile = await fs.readFile(path.resolve("flags.json"), "utf8");
	await OpenFeature.setProviderAndWait(new InMemoryProvider(JSON.parse(flagFile)));
	response.flags = {}
	next();
}

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