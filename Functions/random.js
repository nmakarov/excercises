const crypto = require('crypto');
const expect = require('chai').expect;

const makeGen1 = (a, c, m) => x => (a*x+c) % m;

describe("Generator #1", () => {
    it("A few numbers", () => {
        const g = makeGen1(55,110,1000);
        let x0 = 1;
        let x;
        for(let i = 1; i<10; i++) {
            x = g(x0);
            console.info(`${i}: ${x}`);
            x0 = x;
        }
    });
    
});

describe("Other random things", () => {
    it("Tokens", () => {
        const tokenGen = () => (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
        for (let i=10; i--;) {
            console.info("token:", tokenGen());
        }
    });

    it("uuids", () => {
        const four = () => Math.random().toString(16).slice(-4);
        const uuid = () => `${four()}${four()}-${four()}-${four()}-${four()}-${four()}${four()}${four()}`;
        for (let i=10; i--;) {
            console.info("uuid:", uuid());
        }
    });
});

describe("tokens", () => {
    const strs = [
        "d935eaf3-b277-cdc9-37be-8be41f7e71b7",
        "short",
        "very very very very very very very very very very very very very very very long string"
    ];

    const printHashes = (name, fn, strs) => 
        strs.forEach((s, i) => console.info(`>> ${name} ${i}: ${fn(s)}`));

    const tokenMd5 = str => 
        crypto.createHash('md5').update(str).digest("hex")

    const tokenSha256 = (str, enc="hex") => 
        crypto.createHash('sha256').update(str).digest(enc)

    const tokenHmac = str => 
        crypto.createHmac('sha256', "secret").update(str).digest("hex")

    it("run", () => {
        console.info(">> digests:", crypto.constants.ENGINE_METHOD_DIGESTS);
        printHashes("md5", tokenMd5, strs);
        printHashes("sha256", tokenSha256, strs);
        printHashes("hmac", tokenHmac, strs);
    })

    it("repeatable", () => {
        expect(tokenMd5(strs[0])).eql(tokenMd5(strs[0]));
        expect(tokenSha256(strs[0])).eql(tokenSha256(strs[0]));
        expect(tokenHmac(strs[0])).eql(tokenHmac(strs[0]));
    });

    it("encodings", () => {
        const encs = [
            "base64",
            "hex",
        ];
        encs.forEach(enc => {
            console.info(`>> ${enc}: ${tokenSha256(strs[0], enc)}`);
        });
    })
});
