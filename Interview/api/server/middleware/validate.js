const _ = require("lodash");
const { createError } = require("./niceErrors");

const schema = {
    feed: {
        location: "params",
        required: true,
        type: "string",
        allowed: [ "alpha", "bravo", "charlie" ],
    }
};

const locations = [
    "auth",
    "params",
    "header",
    "query",
    "body",
    "cookie",
];

// TODO: make `location` to be an array of strings
const getValue = (req, field, location) => {
    const locationsTocheck = location ? [ location ] : locations;
    // TODO: 1. verify that all locations are valid
    // const invalidLocations = locationsTocheck.filter(l => ! locations.includes(l));
    // if (invalidLocations.length) {
    //     throw createError(400, `Validate can't find those locations: ${invalidLocations} when checking a rule for ${field}`);
    // }

    const value = locationsTocheck.reduce((value, location) => value || req[location] && req[location][field], undefined);
    return value;
};

const defaults = {
    required: true,
    type: "string",
};
const validate = (schema) => (req, res, next) => {
    console.info(">> schema:", schema);
    const errors = [];
    for ([field, rules] of Object.entries(schema)) {
        const rule = { ...defaults, ...rules };
        let value = getValue(req, field, rule.location) || rule.default;
        console.info(`>> field: ${field}, value: "${value}"`);
        if ( typeof value === "undefined" && rule.required) {
            errors.push(`${field} is required.${rule.hint ? " " + rule.hint : ""}`);
        }

        if (rule.type === "string") {
            value = String(value);
        } else if (rule.type === "number") {
            value = Number(value);
            if (isNaN(value)) {
                errors.push(`${field} should be numeric`)
            }
        }

        if ( ! req.data) {
            req.data = {};
        }
        req.data[field] = value;
    }
    if (errors.length) {
        req.errors = errors;
        return next(createError(400, "validation error", { errors }));
    }
    console.info(">>> data now:", )
    next();
};

module.exports = {
    validate,
};
