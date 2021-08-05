class Base {
    constructor(params={}) {
        for (let p of Object.keys(params)) {
            this[p] = params[p];
            console.info(`>> [Base contructor] param ${p}, value: ${params[p]}`);
        }
        // this = { ...params };
    }

    exec(method, ...args) {
        if (typeof this[method] === "function") {
            return this[method](...args);
        }
        return null;
    }
}

const AIMixin = {
    tick() {
        // here goes the timer-dependent logic
    }
};

const FighterMixin = {
    constructor(params) {
        super.constructor(params);
        this.hitpoints =  this.hitpoints || 10;
        console.info("here");
    },

    getHitpoints() {
        return this.hitpoints;
    },

    attack(defender) {
        // if attacker can cast an attack
        if (this.energy < this.attackCost || this.lag > 0) {
            return;
        }

        // if defender can receive an attack ???
        this.energy -= this.attackCost;
        defender.hitpoints -= this.attackPoints;

        defender.exec("postattack");
    }
};
class Player extends Base {
}

Object.assign(Player.prototype, FighterMixin);

class Rabbit extends Base {
    constructor(params) {
        super(params);
        this.name = "a rabbit";
    }
}

const player = new Player({ name: "Vasya" });
const rabbit = new Rabbit();

console.info("player hitpoints:", player.getHitpoints());

player.attack(rabbit);

module.exports = {
    Base,
};
