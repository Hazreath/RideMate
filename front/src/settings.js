/**
 * === Settings.js ===
 * Local class used to param FRONTEND
 *
 */
const { getIntArrayFromEnvVar } = require("./utils/Environment");

class Settings {
    // Dev environment : either local, or prod
    static ENV;
    // AES Encryption key : password encryption when sent from front to serv
    static AES_KEY = getIntArrayFromEnvVar(process.env.REACT_APP_AES_KEY);
    static AES_ROUNDS = process.env.REACT_APP_AES_ROUNDS;

    /**
     * Returns the correct api url depending on the arg path
     * @param {string} path API path, begins and finishes with '/'
     * @returns API url related to asked path
     */
    static getApiUrl(path) {
        //let url = this.protocol + this.ip + this.port + this.endpoint;
        let url = "";
        if (!Settings.ENV) {
            console.log(window.location);
            let front_url = window.location.origin;
            Settings.ENV =
                front_url === "http://localhost:3000" ? "local" : "prod";
            console.log("Env set to : " + Settings.ENV);
        }

        // switch (Settings.ENV) {
        //     case "local":
        //         url = "http://192.168.1.14:8080/api";
        //         break;
        //     case "prod":
        //         url = "https://ridemate-api.herokuapp.com/api";
        //         break;
        // }
        url = process.env.REACT_APP_BACK_URL;

        // console.log("url: " + url + path)
        return url + path;
    }
}

export default Settings;
