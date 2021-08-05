class FightManager {
    constructor() {
        this.vectors = {};
    }

    addVector(attacker, defender) {
        const id = uuidV4();
        this.vectors[id] = { attacker, defender };
    }

    round() {
        this.vectors.forEach(id => {
            const { attacker, defender } = this.vectors[id];
            if (attacker.stamina > 0) {
                attacker.attack(defender);
            }

            if (defender.hitpoints <= 0) {
                this.removeVector(id);
            }
        })
    }
}

/*
nope.

actors.filter(a => a.fighting).sort(a.fightStart).forEach(attacker => {
    attacker.attack(attacker.fightTarget);
})

module.exports = FightManager;
