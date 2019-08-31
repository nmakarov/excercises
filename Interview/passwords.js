const expect = require('chai').expect;

const print = (fn, num) => {
    console.info("");
    Array.from(Array(num)).map(x => console.info(fn()));
    console.info("");
};

describe("Different password generators", () => {
    it("first", () => {
        const gen = () => Math.random().toString(36).slice(2);
        print(gen, 10);
    });

    it("second", () => {
        const gen = (length = 10) => {
            const letters = "abcdefghijklmnopqrstuvwxyz";
            const string = letters + letters.toUpperCase();
            const numeric = '0123456789';
            const punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
            const remove = "0OlI1|";

            let passwd = "";

            for (let i = length; i--;) {
                let char = "";
                while (true) {
                    const selector = Math.floor(Math.random() * 3);
                    source =
                        selector === 0 ? string :
                        selector === 1 ? numeric :
                        punctuation;
                    char = source.charAt(Math.random()*source.length);
                    if (remove.includes(char)) {
                        continue;
                    }
                    break;
                }

                passwd += char;
            }

            return passwd.split().sort(() => Math.random()-0.5).join();
        }
        print(gen, 10);
    });

    it("third", () => {
        // same as "second", but make sure it has at least one uppercase, one lower and one punctuation

        // let chars = String.fromCharCode(...Array(127).keys()).slice(33),//chars
        // A2Z = String.fromCharCode(...Array(91).keys()).slice(65),//A-Z
        // a2z = String.fromCharCode(...Array(123).keys()).slice(97),//a-z
        // zero2nine = String.fromCharCode(...Array(58).keys()).slice(48),//0-9
        // specials = chars.replace(/\w/g, '')

        // return [...Array(n)].map(b=>c[~~(Math.random()*62)]).join('')

    });

    it("fourth", () => {
        const crypto = require("crypto");
        const gen = (length=10) => {
            const buf = crypto.randomBytes(length);
            // let buf = new Uint8Array(6);
            return buf.toString('hex');
            // crypto.getRandomValues(buf);
            // return btoa(String.fromCharCode.apply(null, buf));
        };
        print(gen, 10);
    });

    it("third", () => {
        const gen = (length=10) => 
            [...Array.from({length}, () => String.fromCharCode(Math.floor(Math.random() * 57) + 65))].join("")
        ;
        print(gen, 10);
    });

    
});
