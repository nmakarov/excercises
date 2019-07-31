/*
openssl genrsa -des3 -out private.pem 2048
openssl rsa -in private.pem -pubout > public.pem
*/

const expect = require('chai').expect;

const fs = require("fs");
const ursa = require("ursa");
const JSEncrypt = require("jsencrypt");

const private = fs.readFileSync("./private.pem");
const public = fs.readFileSync("./public.pem");

const msg = "Should be fine";

describe("Crypts", () => {
    it("ursa", () => {
        const key = ursa.createPrivateKey(private, "aaaa");
        const crt = ursa.createPublicKey(public);
        
        const crypted = crt.encrypt(msg, "utf8", "base64");
        // console.info(">> crypted:", crypted);
        
        const decrypted = key.decrypt(crypted, "base64", "utf8");
        // console.info(">> decrypted:", decrypted);
        expect(decrypted).eq(msg);
    });

    it("jsencrypt", () => {
        const encrypt = new JSEncrypt();
    });
});

