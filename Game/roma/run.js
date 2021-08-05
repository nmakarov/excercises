class Base {
    constructor(hitpoints) {
        this.attackpoints = 1;
        this.hitpoints = hitpoints;
    }
    attack(target) {
        target.hitpoints -= this.attackpoints;
        console.info(`${this.name} attacked ${target.name} leaving ${target.hitpoints} hitpoints`);
        if (target.hitpoints <= 0) {
            console.info(`${target.name} is dead`);
        }
    }
}

class Rabbit extends Base {
    constructor(params) {
        super(params);
        this.name = "a rabbit";
    }
}

class Squirrel extends Base {
    constructor(params) {
        super(params);
        this.name = "a squirrel";
    }
}

const rabbit = new Rabbit(5);
const squirrel = new Squirrel(3);

rabbit.attack(squirrel);
rabbit.attack(squirrel);
rabbit.attack(squirrel);
rabbit.attack(squirrel);
squirrel.attack(rabbit);
