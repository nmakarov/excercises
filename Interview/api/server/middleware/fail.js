const { createError } = require("../middleware/niceErrors");

const fail = async (req, res, next) => {
    let { fail, failRate=100 } = req.query;
    if (fail) {
        const chance = Math.random() * 100;
        console.info(">> typeof failRate:", typeof failRate);
        if (chance < Number(failRate)) {
            return next(createError(400));
        }
    }
    return next();
};

module.exports = {
    fail
};
