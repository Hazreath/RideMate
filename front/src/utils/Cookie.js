const COOKIE_DURATION = "";
const TOKEN_PARAM_NAME = "token=";

function createCookie(paramName, value, expires) {
    document.cookie =
        "" + paramName + "=" + value + ";expires=" + expires + ";";
}

export function setTokenCookie(token) {
    let expDate = new Date();
    expDate.setTime(expDate.getTime() + 24 * 60 * 60 * 1000); // 24h duration
    createCookie("token", token, expDate);
}

export function getTokenFromCookie() {
    let cookies = document.cookie.split(";");
    console.log(cookies);

    let index;
    for (
        index = 0;
        index < cookies.length && cookies[index].includes(TOKEN_PARAM_NAME);
        index++
    )
        return cookies[index].substring(TOKEN_PARAM_NAME.length);
}
