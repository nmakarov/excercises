const expect = require('chai').expect;

const versions = {
    "v3.00.22": [3,0,22],
    "v1.2.3": [1,2,3],
    "v20.3.0336.13": [20,3,336,13],
    "v20.3.23360.13": [20,3,23360,13],
};

const convertVersion = version => {
    const justIntsAndDots = version.replace(/[^\d.]/g, "");
    const parts = justIntsAndDots.split(".");
    return parts.map((part) => {
        return parseInt("" + part, 10);
    });
};

const compareVersion = (v1, v2) => {
    const v1i = convertVersion(v1);
    const v2i = convertVersion(v2);
    let result = "equal";
    for (let i = 0; i < v1i.length; i++) {
        if (v1i[i] === undefined || v2i[i] === undefined) {
            break;
        } else if (v1i[i] < v2i[i]) {
            result = "lesser";
            break;
        } else if (v1i[i] > v2i[i]) {
            result = "greater";
            break;    
        }
    }
    return result;
}

describe("conversions", () => {
    it("convert", () => {
        Object.keys(versions).forEach(version => {
            expect(convertVersion(version)).deep.eq(versions[version]);
        });
    });
    it("compare", () => {
        expect(compareVersion("v3.00.22", "v3.00.23")).eq("lesser");
        expect(compareVersion("v3.00.22", "v3.00.22")).eq("equal");
        expect(compareVersion("v3.00.22", "v3.00.21")).eq("greater");

        expect(compareVersion("v20.3.0336.13", "v20.3.0336.14")).eq("lesser");
        expect(compareVersion("v20.3.033612.13", "v20.3.0337.13")).eq("greater");

        expect(compareVersion("v3.00.22", "v3.00.22.15")).eq("equal");
        expect(compareVersion("v3.00.22.15", "v3.00.22")).eq("equal");
    });
});
