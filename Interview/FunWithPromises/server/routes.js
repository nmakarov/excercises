const { Router } = require("express");
const { add } = require("./handlers");

const router = Router();

router.get("/add", add);

module.exports = router;
