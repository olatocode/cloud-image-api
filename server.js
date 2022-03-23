/** @format */

const http = require('http');
const app = require('./src/app');
const server = http.createServer(app);
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`CMA is running on port ${port}`);
});
