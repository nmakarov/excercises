const { Router } = require("express");
var jwt = require('jsonwebtoken');
const { validate } = require("../middleware/validate");
const { auth } = require("../middleware/auth");
const { names } = require("../services/data");

const router = Router();

router.get("/version", (req, res) => {
    res.json({
        version: 1.1
    })
});

const feedController = (req, res) => {
    const snapshot = names.slice(0, 10);
    res.niceResponse({ data: snapshot });
};

const feedSchema = {};
router.get("/feed/:feed", validate(feedSchema), feedController);

const authSchema = {
    Authorization: {},
};
router.get("/authenticatedFeed/:feed", validate(authSchema), auth, validate(feedSchema), feedController);
// router.get("/authenticatedFeed/:feed", validate(feedSchema), feedController);


const tokenSchema = {
    exp: {
        hint: "Examples: 2h, 5s etc.",
        default: "1d",
    },

};

router.get("/token", validate(tokenSchema), (req, res) => {
// router.get("/token", (req, res) => {
    const payload = {
        authenticated: true,
    };
    // const token = jwt.sign(payload, "secret", { expiresIn: req.data.exp });
    const token = jwt.sign(payload, "secret");
    res.niceResponse({ token });
});

module.exports = router;
