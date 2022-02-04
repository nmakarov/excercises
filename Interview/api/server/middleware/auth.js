var jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const { auth, useAuth } = req.query;

    // if ( ! useAuth) {
    //     return next();
    // }
    console.info(">> auth here:", req.data.Authorization);
    const pair = req.data.Authorization.split(" ");
    const token = pair[1];
    console.info(">> toooken:", token);

    try {
        const parsed = jwt.verify(token, "secret");
    } catch (e) {
        console.info(">> token verify name:", e.name);
        console.info(">> token verify message:", e.message);
        return next("oops");
    }
    console.info(">> parsed:", parsed);
    next();
};

module.exports = {
    auth
};
