const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3400;

const server = http.createServer(app);

server.listen(port, () => {
    console.log("OK Computer - We are connected. PORT: " + port);
})