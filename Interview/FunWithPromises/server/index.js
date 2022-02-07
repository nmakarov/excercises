const { server } = require("./server");

const port = process.env.port || 7001;

server.listen(port, () => {
    console.info(">> server listens on", port);
});
