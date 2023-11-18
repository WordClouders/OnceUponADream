const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const { Client } = require("@hashgraph/sdk");

// Replace with your account ID and private key
const operatorAccountId = "0.0.5906620";
const operatorPrivateKey = "0x3e5f0af4705375bb18dfd295483fa4b0766d73d6a6e0c5d210f4193c0523dd6e";

// Initialize the Hedera Client
const client = Client.forTestnet();
client.setOperator(operatorAccountId, operatorPrivateKey);

// Your application logic goes here