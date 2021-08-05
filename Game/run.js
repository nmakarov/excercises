const DanceParty = () => {
}

const hasName = state => ({
    getName() {
        console.info(`${state.name} standing here`);
    }
});

const hasAbc = state => ({
    abc(...params) {
        console.info("A B C", params.join(', '));
    },

    // better: invoke
    call(method, ...args) {
        if (typeof state[method] === "function") {
            state[method](...args);
        } else {
            console.info(`${state.name} has no method ${method}`);
        }
    }
});

const canAttack = attacker => ({
    attack(target) {
        if (typeof target.attackableBy === 'function' && target.attackableBy(attacker)) {
            console.info(`${attacker.name} attacks ${target.name}!`);
        } else {
            console.info(`${attacker.name} can't attack ${target.name}`);
        }
    }
});

const canBeAttacked = state => ({
    attackableBy(attacker) {
        return true;
    }
});

function Player(name) {
    const state = {
        name
    };
    return Object.assign(
        state,
        hasName(state),
        canAttack(state),
        hasAbc(state),
    )
}

function Rabbit(name='a rabbit') {
    const state = {
        name
    };

    return Object.assign(
        state,
        hasName(state),
        canBeAttacked(state),
    )
}

function Tree(name='a tree') {
    const state = {
        name
    };

    return Object.assign(
        state,
        hasName(state),
        // cannotBeAttacked(state),
    )
}

const player = new Player('Vasya');
const rabbit = new Rabbit();
const tree = new Tree();

player.attack(tree);
player.attack(rabbit);


// player.getName();
// player.abc();
// player.call('abc', 'xyz', 'ddd');



// const danceParty = new DanceParty();
// danceParty.add(player);
// danceParty.add(rabbit);

// danceParty.round();
