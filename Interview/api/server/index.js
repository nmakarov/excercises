const server = require("./server");
const port = process.env.PORT || 6543;

server.listen(port, () => {
    console.info(`API server is listening at ${port}`);
});
