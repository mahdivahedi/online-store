const next = require('next')
const Routing = require('./src/libs/Routing')
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev })
const handler = Routing.routes.getRequestHandler(app);

app.prepare().then(() => {
	const port = parseInt(process.env.PORT, 10) || process.env.NEXT_PUBLIC_PORT;
	const server = express();

	server.all('*', (req, res) => {
		return handler(req, res);
	});


	server.listen(port, err => {
		if (err) throw err;
		console.log(`server is listening on ${port} port ...`);
	});
});
