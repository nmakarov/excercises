class Animal {
    constructor(name) {
        this.name = name;
    }

    walk() {
        console.info(`${this.name} is walking`);
    }
}

class Bird extends Animal {
    fly() {
        console.info(`${this.name} is flying`);
    }
}

const fighter = {
    energy: 10,
    fight() {
        this.energy--;
        console.info(`${this.name} is fighting, energy left ${this.energy}`);
    }
}

Object.assign(Bird.prototype, fighter);

const b = new Bird('Duck');
b.walk();
b.fly();
b.fight();
b.fight();
b.fight();
