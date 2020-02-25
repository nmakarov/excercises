const crypto = require('crypto');
const assert = require('assert');

const alice = crypto.createDiffieHellman(1024);
const aliceKey = alice.generateKeys();

// console.info(">> aliceKey:", aliceKey.toString('hex'));
console.info(">> getPrime:", alice.getPrime().toString('hex'));
console.info(">> generator():", alice.getGenerator().toString('hex'));
