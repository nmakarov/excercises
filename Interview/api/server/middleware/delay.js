const delay = async (req, res, next) => {
    const { delay } = req.query;
    if (delay) {
        setTimeout(next, delay);
    } else {
        next();
    }
};

module.exports = {
    delay
};
