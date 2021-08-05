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
// const ticker = new Ticker();

// process.on( 'SIGINT', function() {
//     console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
//     ticker.stop();
//     process.exit( );
// });


const Base = class {
    constructor(params = {}) {
        for (let k in params) {
            this[k] = params[k];
        }
    }
};

const Room = class extends Base {
    constructor(params) {
        super(params);
        this.entities = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    trigger(event, params) {
        if (this[`on_${event}`]) {
            this[`on_${event}`](params);
        }
    }

    on_enter(entity) {
        console.info(`>> on_enter room:${this.id} entity:${entity.name}`);
    }
    on_leave(entity) {
        console.info(`>> on_leave room:${this.id} entity:${entity.name}`);
    }
};

const Rabbit = class extends Base {
    move(direction) {
        // TODO add lots of checks here - direction is valid? can leave? can enter? etc.
        const thisRoom = this.room;
        const nextRoom = rooms.findById(this.room.exits[direction]);
        console.info(">>>>>", nextRoom);
        thisRoom.trigger("leave", this);
        this.room = nextRoom;
        nextRoom.trigger("enter", this);

    }
};

const npcClasses = {
    rabbit: Rabbit,
}

const Rooms = class {
    constructor() {
        this.rooms = [];
    }

    addRoom(r) {
        this.rooms.push(r);
    }

    findById(id) {
        let found = null;
        for( let i = 0; i < this.rooms.length; i++) {
            if (this.rooms[i].id === id) {
                found = this.rooms[i];
                break;
            }
        }
        return found;    
    }


    getRandomRoom() {
        const roomList = this.rooms.map(r => r.id);
        const id = roomList[Math.floor(Math.random() * roomList.length)];
        return id;
    }

    debugPrint() {
        this.rooms.forEach(r => {
            console.info(`>> room ${r.id} - ${r.name}`);
            r.entities.forEach(e => {
                // @TODO use entity state for this - стоит, сидит, сражается и т.п.
                console.info(`   ${e.name} стоит здесь`);
            })
        });        
    }
}

const rooms = new Rooms();
const roomDefs = require("./data/zones/NearbyForest/rooms");
roomDefs.forEach(rd => {
    rooms.addRoom(new Room(rd));
});

const npcDefs = require("./data/zones/NearbyForest/npcs");

let entity = null;
npcDefs.forEach(n => {
    const count = n.count || 1;
    for(let i = count; i--;) {
        const nc = new npcClasses[n.type](n.props);

        const spawnRoom = n.spawnRoom === "random"
            ? rooms.getRandomRoom()
            : n.spawnRoom;
        nc.room = rooms.findById(spawnRoom);
        console.info(`>> ${nc.name} be placed at ${nc.room.name} ${n.spawnRoom === "random" ? "(random)" : ""}`);
        nc.room.addEntity(nc);

        if(nc.name === "матерый заяц") {
            entity = nc;
        }
    }
});

rooms.debugPrint();

entity.move("north");



