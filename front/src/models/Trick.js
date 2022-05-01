/**
 * ========= TRICK.JS=========
 * Modélise un trick possédant un nom, et une plateforme (module sur lequel il sera effectué)
 * 
 * TODO : XP, difficulté, street ...
 */

class Trick {

    platform_id;
    name;
    
    // xp;

    constructor(name,platform) {
        this.name = name;
        this.platform_id = platform;
        // this.xp = xp
    }
}

export default Trick