const axios = require("axios");

(async () => {
    const req = {
        url: "http://localhost:6543/api/feed/alpha",
    };
    const res = await axios(req);
    console.info(">> data:", res.data);
})();
