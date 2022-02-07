const add = (req, res) => {
    const { x, y } = req.query;
    res.json({ value: Number(x) + Number(y) });
};

module.exports = {
    add,
};
