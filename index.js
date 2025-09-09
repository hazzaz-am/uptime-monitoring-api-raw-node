const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environments = require("./helpers/environments");

const app = {};

// create server
app.createServer = () => {
	const server = http.createServer(app.handleReqRes);
	server.listen(environments.port, () => {
		console.log(`Server is listening on ${environments.port}`);
	});
};

// handle req res
app.handleReqRes = handleReqRes;

// start server
app.createServer();
