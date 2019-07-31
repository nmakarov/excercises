const expect = require('chai').expect;

describe("Gross Pay Problem", () => {
    const associate = { roleId: 3, rate: 12.5,overtime: 18.75 };
    const supervisor = { roleId: 2, rate: 15,overtime: 22.5 };
    const admin = { roleId: 1, rate: 30, overtime: 0 }; // salary no overtime

    const grossPay = (role, normalHours, ovtHours) => {
        return role.rate * normalHours + (role.overtime ? role.overtime : role.rate) * ovtHours;
    };

    it("should execute generic function", () => {
        expect(grossPay(associate, 1, 1)).to.eq(31.25);
        expect(grossPay(associate, 5, 0)).to.eq(62.5);
        expect(grossPay(admin, 1, 0)).to.eq(30);
        expect(grossPay(admin, 1, 1)).to.eq(60);
    });

    it("should execute partial app fns", () => {
        const grossPayAssociate = (normalHours, ovtHours) => grossPay(associate, normalHours, ovtHours);

        expect(grossPayAssociate(1, 1)).to.eq(31.25);
        expect(grossPayAssociate(5, 0)).to.eq(62.5);
    });
});
