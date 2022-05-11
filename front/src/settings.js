/**
 * === Settings.js ===
 * Local unversioned class used to param FRONTEND
 * 
 */
class Settings {
    
    static protocol = "http://"
    static ip = "192.168.1.14"
    static port = ":3001"
    static endpoint = "/api"
    // static API_URL = 'http://192.168.1.14:3001/api/'

    /**
     * Returns the correct api url depending on the arg path
     * @param {string} path API path, begins and finishes with '/' 
     * @returns API url related to asked path
     */
    static getApiUrl(path) {
        let url = this.protocol + this.ip + this.port + this.endpoint
        
        // console.log("url: " + url + path)
        return url + path
    }
}

export default Settings