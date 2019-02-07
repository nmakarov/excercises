var expect = require('chai').expect;

describe("Immutable arrays with JS", () => {
    const planets = [
        { name: "Mercury" },
        { name: "Venus" },
        { name: "Earth" }
    ];

    it("Adding an element using spread", () => {
        const withMars = [{ name: "Mars" }, ...planets];
        expect(withMars.length).to.eq(4);
        expect(planets.length).to.eq(3);
    });

    it("Adding an element using concat", () => {
        const withMars = planets.concat([{ name: "Mars" }]);
        expect(withMars.length).to.eq(4);
        expect(planets.length).to.eq(3);
    });

    it("Removing an element", () => {
        const venusIndex = planets.reduce((r, p, i) => (p.name === 'Venus' ? i : r), -1);
        const withoutVenus = [...planets.slice(0, venusIndex), ...planets.slice(venusIndex+1)];
        expect(withoutVenus.length).to.eq(2);
        expect(planets.length).to.eq(3);
    });
    
});