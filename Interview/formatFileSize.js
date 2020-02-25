const expect = require('chai').expect;

describe("solution", () => {
    it("take1", () => {
        const format = s => {
            const suffixes = ["B", "KB", "MB", "GB", "TB", "PB"];
            const offset = Math.floor(Math.log(s) / Math.log(1024));
            const r = `${(s / Math.pow(1024, offset)).toPrecision(3)} ${suffixes[offset]}`;
            return r;
        };

        expect(format(123)).eql("123 B");
        expect(format(234234)).eql("229 KB");
        expect(format(98223445)).eql("93.7 MB");
        expect(format(3498223445)).eql("3.26 GB");
        expect(format(3436498223445)).eql("3.13 TB");
        expect(format(6853436498223445)).eql("6.09 PB");
    });

    it("take1", () => {
        const format = s => 
            `${(s / Math.pow(1024, Math.floor(Math.log(s) / Math.log(1024)))).toPrecision(3)} ${["B", "KB", "MB", "GB", "TB", "PB"][Math.floor(Math.log(s) / Math.log(1024))]}`
        ;

        expect(format(123)).eql("123 B");
        expect(format(234234)).eql("229 KB");
        expect(format(98223445)).eql("93.7 MB");
        expect(format(3498223445)).eql("3.26 GB");
        expect(format(3436498223445)).eql("3.13 TB");
        expect(format(6853436498223445)).eql("6.09 PB");
    });
});
