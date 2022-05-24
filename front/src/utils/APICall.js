import { getTokenFromCookie } from "./Cookie";

const axios = require("axios").default;

/**
 * Get data from argument API url
 * Includes JWT Token in request headers
 * @param {*} url where the data we need is
 * @returns Axios promise
 */
export function getFromApi(url) {
    let token = getTokenFromCookie();
    console.log("GET : " + url + ";\nToken : " + token);
    let headers = {
        authorization: "Bearer " + token,
    };
    return axios.get(url, {
        headers: headers,
    });
}

/**
 * Post data to argument API url
 * Includes JWT Token in request headers
 * @param {*} url where the data will be posted
 * @param {*} data request body
 * @returns Axios promise
 */
export function postToApi(url, data) {
    let token = getTokenFromCookie();
    // console.log("POST : " + url + ";\n Token:" + token + "\ndata:");
    // console.log(data);
    let headers = {
        Authorization: "Bearer " + token,
    };
    return axios.post(
        url,
        { ...data },
        {
            headers: headers,
        }
    );
}
