class Rabbit {
    constructor() {
        this.name = "a rabbit";
        this.hitpoints = 4;
        this.attackpoints = 1;
    }

    hit(target) {
        target.hitpoints -= this.attackpoints;
        console.info(`${this.name} hit ${target.name}, now it has ${target.hitpoints} hitpoints left`);
        target.afterHit();
    }
}

class Squirrel {
    constructor() {
        this.name = "a squirrel";
        this.hitpoints = 3;
        this.attackpoints = 1;
    }

    hit(target) {
        target.hitpoints -= this.attackpoints;
        console.info(`${this.name} hit ${target.name}, now it has ${target.hitpoints} hitpoints left`);
    }

    afterHit() {
        if (this.hitpoints <= 0) {
            console.info(`${this.name} is dead.`);
        }
    }
}

const rabbit = new Rabbit();
const squirrel = new Squirrel();

rabbit.hit(squirrel);
squirrel.hit(rabbit);
rabbit.hit(squirrel);
rabbit.hit(squirrel);

