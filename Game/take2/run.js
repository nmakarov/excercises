class Base {
    constructor(name) {
        this.name = name;
    }

    hit(target) {
        target.hitpoints -= this.attackpoints;
        console.info(`${this.name} hit ${target.name}, now it has ${target.hitpoints} hitpoints left`);
        target.afterHit();
    }

    afterHit() {
        if (this.hitpoints <= 0) {
            console.info(`${this.name} is dead.`);
        }
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

rabbit.hit(squirrel);
squirrel.hit(rabbit);
rabbit.hit(squirrel);
rabbit.hit(squirrel);

