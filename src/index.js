const { app } = require("./server");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log("OpenFeature ExpressJS demo server running on port " + PORT);
});