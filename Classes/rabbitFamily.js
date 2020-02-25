const expect = require("chai").expect;

describe("es5", () => {
    const RabbitGrandfather = function () {};
    RabbitGrandfather.prototype = {
        tail: true
    };

    const RabbitFather = function () {};
    RabbitFather.prototype = Object.create(RabbitGrandfather.prototype);

    const RabbitSon = function () {};
    RabbitSon.prototype = Object.create(RabbitFather.prototype);

    const gf = new RabbitGrandfather;
    const f = new RabbitFather;
    const s = new RabbitSon;
    
    it("tails?", () => {
        expect([gf.tail, f.tail, s.tail]).eql([true, true, true]);
    });

    it("tailless family", () => {
        RabbitGrandfather.prototype.tail = false;
        expect([gf.tail, f.tail, s.tail]).eql([false, false, false]);
    });

    it("partially tailed family", () => {
        RabbitFather.prototype.tail = true;
        expect([gf.tail, f.tail, s.tail]).eql([false, true, true]);
    });
});

describe("es6", () => {
    const RabbitGrandfather = class {
        // constructor() {
        //     this.tail = true;
        // }
        // hasTail() {
        //     return true;
        // }
    }
    RabbitGrandfather.prototype = {
        hasTail: () => { return true; }
    };

    RabbitGrandfather.prototype.hasTail = () => { return true; }

    const RabbitFather = class extends RabbitGrandfather {}
    const RabbitSon = class extends RabbitFather {}

    const gf = new RabbitGrandfather;
    const f = new RabbitFather;
    const s = new RabbitSon;

    it("tails?", () => {
        expect([gf.hasTail(), f.hasTail(), s.hasTail()]).eql([true, true, true]);
    });

    it("tailless family", () => {
        RabbitGrandfather.prototype.hasTail = () => {return false;};
        expect([gf.hasTail(), f.hasTail(), s.hasTail()]).eql([false, false, false]);
    });

});

describe("es6 methods chaining", () => {
    const RabbitGrandfather = class {
        walkSpeed() {
            // return "slow";
            return this.speed;
        }
    }
    RabbitGrandfather.prototype.speed = "slow";

    const RabbitFather = class extends RabbitGrandfather {};
    const RabbitSon = class extends RabbitFather {};

    const gf = new RabbitGrandfather;
    const f = new RabbitFather;
    const s = new RabbitSon;

    it("slow family", () => {
        expect([gf.walkSpeed(), f.walkSpeed(), s.walkSpeed()]).eql(["slow", "slow", "slow"]);
    });

    it("father and son are faster", () => {
        RabbitFather.prototype.speed = "average";
        expect([gf.walkSpeed(), f.walkSpeed(), s.walkSpeed()]).eql(["slow", "average", "average"]);
    });

    it("son can fly", () => {
        RabbitSon.prototype.walkSpeed = () => { return "flying"; };
        expect([gf.walkSpeed(), f.walkSpeed(), s.walkSpeed()]).eql(["slow", "average", "flying"]);
    })
});

describe("mixins", () => {
    const RabbitGrandfather = class {
        constructor(params={speed:1}) {
            for (let k in params) {
                this[k] = params[k];
            }
        }
    };
    const RabbitFather = class extends RabbitGrandfather{};
    const RabbitSon = class extends RabbitFather{};

    const SpeedMixin = {
        speed1: 1,
    };

    const WalkerMixin = {
        walk() {
            return `walking, speed ${this.speed}`;
        }
    };

    const RunnerMixin = {
        run() {
            return `running, speed ${this.speed}`;
        }
    };

    const FlyerMixin = {
        fly() {
            return `flying, speed ${this.speed}`;
        }
    };

    Object.assign(RabbitGrandfather.prototype, SpeedMixin, WalkerMixin);
    Object.assign(RabbitFather.prototype, RunnerMixin);
    Object.assign(RabbitSon.prototype, FlyerMixin);

    const gf = new RabbitGrandfather;
    const f = new RabbitFather({speed:2});
    const s = new RabbitSon({speed:3});

    it("they can walk", () => {
        expect([gf.walk(), f.walk(), s.walk()]).eql(["walking, speed 1", "walking, speed 2", "walking, speed 3"]);
    });

    it("some can run", () => {
        expect([f.run(), s.run()]).eql(["running, speed 2", "running, speed 3"]);

    });

    it("one can fly", () => {
        expect(s.fly()).eql("flying, speed 3");
    });

    it("son by var", () => {
        const cls = {
            son: RabbitSon,
            father: RabbitFather
        };
        const s = new cls["son"]({speed: 5});
        expect(s.run()).eql("running, speed 5");
    });
});


