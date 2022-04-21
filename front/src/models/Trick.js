/**
 * ========= TRICK.JS=========
 * Modélise un trick possédant un nom, et une plateforme (module sur lequel il sera effectué)
 * 
 * TODO : XP, difficulté, street ...
 */

class Trick {

    name;
    platform;

    constructor(name,platform) {
        this.name = name;
        this.platform = platform;
        
    }
}

export default Trick