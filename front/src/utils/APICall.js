import Settings from "../settings";
import { getTokenFromCookie, getUserIDFromCookie } from "./Cookie";

const axios = require("axios").default;

/**
 * Get data from argument API url
 * Includes JWT Token in request headers, which contains encrypted current userId,
 * to compare it to sent user_id, for auth
 * @param {*} url where the data we need is
 * @returns Axios promise
 */
export function getFromApi(url) {
    let token = getTokenFromCookie();
    // console.log("GET : " + url + ";\nToken : " + token);
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
export function postToApi(url, data, customHeaders) {
    let token = getTokenFromCookie();

    let headers = {
        Authorization: "Bearer " + token,
    };

    if (customHeaders) {
        // Add to req headers
        for (let prop in customHeaders) {
            headers[prop] = customHeaders[prop];
        }
        // console.log("Custom headers :");
        // console.log(headers);
    }
    // Including current user id for auth check
    data.params.user_id = getUserIDFromCookie();

    console.log("POST : " + url + ";\n Token:" + token + "\ndata:");
    console.log(data);
    return axios.post(
        url,
        { ...data },
        {
            headers: headers,
        }
    );
}

export function postFileToApi(url, file) {
    // return axios.postForm(url, data);
    let h = {
        authorization:
            "Bearer " + getTokenFromCookie() + " " + getUserIDFromCookie(),
    };
    return axios.postForm(url, file, { headers: h }); // WORKING
}
/**
 * Post data to argument API url
 * Includes JWT Token in request headers
 * @param {*} url where the data will be posted
 * @param {*} data request body
 * @returns Axios promise
 */
export function patchToApi(url, data, customHeaders) {
    let token = getTokenFromCookie();

    let headers = {
        Authorization: "Bearer " + token,
    };

    if (customHeaders) {
        // Add to req headers
        for (let prop in customHeaders) {
            headers[prop] = customHeaders[prop];
        }
        console.log("Custom headers :");
        console.log(headers);
    }

    // Including current user id for auth check
    data.params.user_id = getUserIDFromCookie();

    // console.log(data);
    // console.log("PATCH : " + url + ";\n Token:" + token + "\ndata:");
    // console.log(data.get("avatar"));
    return axios.patch(
        url,
        { ...data },
        {
            headers: headers,
        }
    );
}
