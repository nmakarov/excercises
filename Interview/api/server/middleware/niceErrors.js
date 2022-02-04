const status = require("statuses");

class NiceError {
    constructor (status, message, extra={}) {
        console.info(">> extra:", extra);
        for (let key in extra) {
            this[key] = extra[key];
        }
        this.status = status;
        this.message = message;
    }
}

const createError = (code, message, extra) => {
    // TODO: interview chance – have this `...? code :...`, pass a "404" and observe a failed test. Ask how to fix
    const statusCode =  ! isNaN(code) ? Number(code) : status(code);
    // const statusMessage = message ? message : isNaN(code) ? code : status(code);
    const statusMessage = message
        ? message
        : isNaN(code)
            ? status(statusCode)
            : status(code);
    return new NiceError(statusCode, statusMessage, extra);
};

for (let [key, value] of Object.entries(status.message)) {
    const name = value.replace(/ /g, "");
    // eslint-disable-next-line no-unreachable
    createError[name] = (message, extra) => createError(Number(key), message, extra);
}

const niceResponse = (req, res, next) => {
    res.niceResponse = (json) => {
        res.json({ status: res.statusCode, ...json });
    };
    return next();
};

const niceErrors = (error, _, res, next) => {
    if (res.headersSent) {
		return next(error);
	}

    if (error instanceof NiceError) {
        res.set("Content-Type", "application/problem+json");
        console.info(">>>>> error:", error);
        const extra = {};
        Object.keys(error).forEach(k => {
            console.info(`>> key ${k}, value:`, error[k]);
            if ( ! [ "status", "message" ].includes(k)) {
                extra[k] = error[k];
            }

        });
        res.status(error.status).json({
            status: error.status,
            message: error.message,
            ...extra
        });
        return next();    
    }
    next(error);
};

module.exports = {
    createError,
    NiceError,
    niceResponse,
    niceErrors,
};
