const expect = require('chai').expect;

const src = {
    key1: "value1",
    key2: "value2",
    books: {
        book1: {
            name: "Alice in Wonderland",
            author: "Lewis Carrol"
        }
    }
};

describe("Basics", () => {
    it("get some keys to vars", () => {
        const { key1, key2, key3 } = src;
        expect(key1).to.eq(src.key1);
        expect(key2).to.eq(src.key2);
        expect(key3).to.be.undefined;
    });

    it("get some keys to vars with renaming and default", () => {
        const { key1:k1, key2:k2, key3:k3="smth" } = src;
        expect(k1).to.eq(src.key1);
        expect(k2).to.eq(src.key2);
        expect(k3).to.eq("smth");
    });

    it("get a copy without specified keys", () => {
        const { books:unneeded, ...target } = src;
        expect(Object.keys(target).length).to.eq(2);
        expect(target.key1).to.eq(src.key1);
        expect(src.books).not.to.be.undefined;
        expect(target.books).to.be.undefined;
    });

    it("extract deeper props", () => {
        const { books: {book1: { name } } } = src;
        expect(name).to.eq(src.books.book1.name);
    });

    it("throws when path prop is undefined", () => {
        try {
            const { books: {book2: { name } } } = src;
            expect(true).to.eq(false);
        } catch (e) {
            expect(e.toString().includes("TypeError: Cannot destructure property `name` of 'undefined' or 'null'")).to.eq(true);
        }
    });
});

describe("Usage", () => {
    it("get ENV params", () => {
        const {
            NODE_ENV='development',
            LOG_LEVEL='info',
            SHELL
        } = process.env;

        expect(NODE_ENV).to.eq('development');
        // console.info(`NODE_ENV:${NODE_ENV}, LOG_LEVEL:${LOG_LEVEL}, SHELL:${SHELL}`);
    });
});

describe("Arrays", () => {
    it(("Deep"), () => {
        const [a, [b, [c]]] = [1, [2, [3]]];
        expect(a).to.eq(1);
        expect(b).to.eq(2);
        expect(c).to.eq(3);
    });
    
    it("skip some", () => {
        const [,a,,,b] = [1,2,3,4,5,6];
        expect(a).to.eq(2);
        expect(b).to.eq(5);
    });

    it("head/tail", () => {
        const [head, ...tail] = [1,2,3,4,5];
        expect(head).to.eq(1);
        expect(tail).to.deep.eq([2,3,4,5]);
    });

    it("Iterables", () => {
        function* fibonacci() {
                let [a, b] = [0, 1];
            while(true) {
                yield a;
                [a, b] = [b, a + b];
            }
        }

        const [, , , , f5] = fibonacci();
        expect(f5).to.eq(3);
    });

});


