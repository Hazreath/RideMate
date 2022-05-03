/**
 * ========= USER.JS =========
 * Représente un utilisateur de l'application
 * TODO : level, XP ...
 */

 class User {

    _id;
    username;
    level;
    xp;
    xpToNextLv;

    constructor(username, level, xp) {
        this.username = username
        this.level = level
        this.xp = xp
        this.xpToNextLv = 69
    }

    toString = function() {
        return this.username + ', Lv.' + this.level + ' (' + this.xp +  '/' + this.xpToNextLv + ').'
    }
}

export default User