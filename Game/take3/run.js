class Base {
    constructor(name) {
        this.name = name;
        this.attacking = null;
    }

    hit(target) {
        target.beforeHit(this);
        target.hitpoints -= this.attackpoints;
        console.info(`${this.name} hit ${target.name}, now it has ${target.hitpoints} hitpoints left`);
        target.afterHit();
        if(target.hitpoints <= 0) {
            this.attacking = null;
        }
    }

    beforeHit(attacker) {
        if ( ! this.attacking) {
            this.attacking = attacker;
        }
    }

    afterHit() {
        if (this.hitpoints <= 0) {
            console.info(`${this.name} is dead.`);
            this.attacking = null;
        }
    }

    attack(target) {
        this.attacking = target;
    }
}

class Rabbit extends Base {
    constructor() {
        super("a rabbit");
        this.hitpoints = 4;
        this.attackpoints = 1;
    }
}

class Squirrel extends Base {
    constructor() {
        super("a squirrel");
        this.hitpoints = 3;
        this.attackpoints = 1;
    }
}


const rabbit = new Rabbit();
const squirrel = new Squirrel();

const fighters = [
    rabbit,
    squirrel
];

setInterval(() => {
    fighters.forEach(f => {
        if (f.attacking) {
            f.hit(f.attacking);
        }
    })
}, 1000);

rabbit.attack(squirrel);


