const express = require('express');
const { checkBananaFlag, setUpFlagProvider } = require('./utils/flags');

const app = express();

app.use(setUpFlagProvider);
app.use(checkBananaFlag);

app.get('/', (request, response) => {

	let message = "ExpressJS server root route. ";

	if (response.flags.banana){
		message += "Now with added potassium!";
	}

	let responseData = {
		message: message
	};

	response.json(responseData);
});

app.get("/flags", (request, response) => {
	response.json(response.flags);
})

module.exports = {
	app
}