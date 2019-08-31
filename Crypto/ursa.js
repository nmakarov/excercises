/*
openssl genrsa -des3 -out private.pem 2048
openssl genrsa -out private2.pem 2048
openssl rsa -in private.pem -pubout > public.pem
*/

const crypto = require('crypto');
const expect = require('chai').expect;

const fs = require("fs");
const ursa = require("ursa");
// const JSEncrypt = require("jsencrypt");

const private = fs.readFileSync("./private2.pem");
const public = fs.readFileSync("./public2.pem");

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
        // const encrypt = new JSEncrypt();
    });

    it("crypto", () => {
        const encrypt = (data, pkPath) => {
            const pk = fs.readFileSync(pkPath, "utf8");
            return crypto.publicEncrypt(pk, Buffer.from(data)).toString("base64");
        };

        const decrypt = (data, pkPath) => {
            const pk = fs.readFileSync(pkPath, "utf8");
            return crypto.privateDecrypt(pk, Buffer.from(data, "base64")).toString("utf8");
        };

        const str = "abcdef123456";

        const encrypted = encrypt(str, "./public2.pem");
        const decrypted = decrypt(encrypted, "./private2.pem");

        // console.info("decrypted:", decrypted);
        expect(decrypted).eq(str);
    });
});

