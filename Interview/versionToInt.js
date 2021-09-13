const expect = require('chai').expect;

const versions = {
    "v3.00.22": 3000022,
    "v1.2.3": 1002003,
    "v20.3.0336.13": 20003336013,
    "v20.3.23360.13": 20003233013,
};

const convertVersion = version => {
    const justIntsAndDots = version.replace(/[^\d.]/g, "");
    const parts = justIntsAndDots.split(".");
    const int = parts.reduce((a, i) => {
        const meaningfulDigits = ("" + parseInt("" + i, 10)).substr(0, 3);
        return a + meaningfulDigits.padStart(3, "0");
    }, "");
    return parseInt(int, 10);
};

describe("conversions", () => {
    it("convert", () => {
        Object.keys(versions).forEach(version => {
            expect(convertVersion(version)).eq(versions[version]);
        });
    });
    it("compare", () => {
        expect(convertVersion("v3.00.22") < convertVersion("v3.00.23")).eq(true);
        expect(convertVersion("v3.00.22") < convertVersion("v3.00.21")).eq(false);

        expect(convertVersion("v20.3.0336.13") < convertVersion("v20.3.0336.14")).eq(true);
        expect(convertVersion("v20.3.0336.13") < convertVersion("v20.3.0337.13")).eq(true);
        expect(convertVersion("v20.3.0336.13") < convertVersion("v20.3.033512.13")).eq(false);
        expect(convertVersion("v20.3.033612.13") < convertVersion("v20.3.0337.13")).eq(true);
    });
});
