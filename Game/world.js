const PubSub = require('pubsub-js');

class World {
    constructor() {
        this.tickMs = 1000;
        this.tickCount = 0;
    }

    tick() {
        this.tickCount++;
        console.info(">> world received tick", this.tickCount);
        if (this.tickCount >= 5) {
            this.stop()
        }
    }

    subscribe(topic, fn) {
        PubSub.subscribe(topic, fn);
    }

    publish(topic, data) {
        PubSub.publish(topic, data);
    }

    start() {
        this.gameToken = setInterval(() => {
            console.info(">> publishing `tick`");
            this.publish("tick");
        }, this.tickMs);
    }

    stop() {
        console.info(">> stopping...");
        clearInterval(this.gameToken);
        console.info(">> stop.");
    }

    setup() {
        this.subscribe("tick", () => this.tick());
    }
}

module.exports = {
    World,
}