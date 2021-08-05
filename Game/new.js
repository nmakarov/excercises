// const Ticker = require("./classes/ticker");

const Ticker = class {
    constructor(ms = 1000) {
        this.tickFn = this.tickFn.bind(this);
        this.handler = setInterval(this.tickFn, ms);
        this.tickCounter = 0;
    }
    tickFn() {
        console.info(">> tick", this.tickCounter);
        if (this.tickCounter++ > 3) {
            this.stop();
        }
    }
    stop() {
        console.info(">> stopping");
        clearInterval(this.handler);
    }
}
const ticker = new Ticker();

process.on( 'SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    ticker.stop();
    process.exit( );
});


const Base = class {
    constructor(params = {}) {
        for (let k in params) {
            this[k] = params[k];
        }
    }
};

const Room = class extends Base {};

const Rabbit = class extends Base {};

class Wolf {}

const npcClasses = {
    rabbit: Rabbit,
    wolf: Wolf,
}

const findOneById = (things, id) => {
    let found = null;
    for( let i = 0; i < things.length; i++) {
        if (things[i].id === id) {
            found = things[i];
            break;
        }
    }
    return found;
};

// -------------------------------

const rooms = [];
const roomDefs = require("./data/zones/NearbyForest/rooms");
roomDefs.forEach(rd => {
    rooms.push(new Room(rd));
});

const npcDefs = require("./data/zones/NearbyForest/npcs");

// rooms.forEach(r => {
//     console.info(`>> room ${r.id} - ${r.name}`);
// });

npcDefs.forEach(n => {
    const nc = new npcClasses[n.type](n.props);
    nc.room = findOneById(rooms, n.spawnRoom);
    console.info(`>> ${nc.name} be placed at ${nc.room && nc.room.name || "random room"}`);
});