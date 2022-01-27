const axios = require("axios");
const { auth } = require("config");
const { dataUrl } = require("endpoints");

const makeGetRequest = async (url, headers, params) => {
    const req = {
        url,
        method: "GET",
        headers,
        params,
        validateStatus: false,
    };
    const response = await axios.request(req);
    if (response.status > 201) {
        console.error(`${response.status}:`, response.data);
        return { status: response.status, data: response.data };
    }
    return { status: null, data: response.data };
}

const makeGetRequestWrapper = async (url, headers, params) => {
    try {
        let response = await makeGetRequest(url, headers, params);
        if ( ! response.status) {
            return response.data;
        }
    } catch (e) {
        return null;
    }
}

/*
external: auth
external: dataUrl
*/
const fetchData = async (limit=100, feeds=["alpha", "bravo", "charlie" ]) => {
    const headers = { Authorization: `Bearer ${auth}` };
    const params = { limit, offset: 0 };
    let combined = [];
    feeds.forEach(feed => {
        const url = dataUrl + "/" + feed;
        while (true) {
            const data = await makeGetRequestWrapper(url, headers, params);
            if (data) {
                combined = [ ...combined, data ];
                params.offset += limit;
            } else {
                console.info("no more data");
                break;
            }
        }
    });
    return combined;
};

module.exports = {
    fetchData,
};
