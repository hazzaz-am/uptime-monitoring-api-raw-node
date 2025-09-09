const http = require("http");

const app = {};

// config
app.config = {
	port: 8000,
};

// create server
app.createServer = () => {
	const server = http.createServer(app.handleReqRes);
	server.listen(app.config.port, () => {
		console.log(`Server is listening on ${app.config.port}`);
	});
};

// handle req res
app.handleReqRes = (req, res) => {
	res.end("Hello world");
};

app.createServer();
