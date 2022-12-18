const COOKIE_DURATION = 86400000; // 24h
const TOKEN_PARAM_NAME = "token";
const USERID_PARAM_NAME = "userId";

/**
 * Create cookie with specified values
 * @param {string} name Cookie name
 * @param {string} value Cookie value
 * @param {Date} expires Cookie expiration date
 */
function createCookie(name, value, expires) {
    document.cookie = "" + name + "=" + value + ";expires=" + expires + ";";
}

/**
 * Change token cookie value to the argument one
 * @param {string} token new value to affect to the cookie
 */
export function setTokenCookie(token) {
    let expDate = new Date();
    expDate.setTime(expDate.getTime() + COOKIE_DURATION); // 24h duration
    createCookie(TOKEN_PARAM_NAME, token, expDate);
}

/**
 * Change userId cookie value to the argument one
 * @param {string} id new value to affect to the cookie
 */
export function setUserIDCookie(id) {
    let expDate = new Date();
    expDate.setTime(expDate.getTime() + COOKIE_DURATION); // 24h duration
    createCookie(USERID_PARAM_NAME, id, expDate);
}

/**
 * Gets current authentified user's JWT token
 * @returns JWT Token value
 */
export function getTokenFromCookie() {
    return getValueFromCookie(TOKEN_PARAM_NAME);
}

/**
 * Gets current authentified user's UserID
 * @returns UserID value
 */
export function getUserIDFromCookie() {
    return getValueFromCookie(USERID_PARAM_NAME);
}

/**
 * Gets value contained in cookie with given name
 * @param {string} name cookie name
 * @returns value of the specified cookie
 */
function getValueFromCookie(name) {
    let cookies = decodeURIComponent(document.cookie).split(";");
    let pattern = name + "=";
    // console.log(cookies);

    let index;

    for (
        index = 0;
        index < cookies.length && !cookies[index].includes(pattern);
        index++
    );

    let result = cookies[index].substring(pattern.length);
    // result = console.log("GetValueFromCookie(" + name + "):" + result);
    // console.log("pattern : " + pattern + ", length : " + pattern.length);
    // console.log("Raw value : " + cookies[index]);

    // There is a ' ' before the name of the non first cookie /!\
    return index > 0 ? result.substring(1) : result;
}
