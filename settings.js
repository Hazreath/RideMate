/**
 * Hello stranger, if you read this, you WON ! 🤑
 * Congrats, you beat me ! Sadly, this is a completely free app for now,
 * and I doubt you can do anything with its data.
 * I had some fun like you when I was younger, so I understand the thrills, and dw,
 * I won't sue you or anything 😁
 * As a consolation prize, you can find a 🏆 l33t h4x0r Leaderboard below, kind of a "I was here" panel.
 * You can leave your hackername or social media '@' below, as a victory ! I'll share it on the website
 * If you are a real homie, you can reach me on instagram at @hazreath, and share how you bypassed
 * RideMate security : I'll give you a bit of money if you do so (I'm still poor, so not much 😅)
 * Until then, see ya ! :)
 * --------------- 🏆 l33t h4x0r Leaderboard : Mark your territory below ! ----------------------------------------
 * - 01/06/2021 | @hazreath / Benji : Hey, I'm the creator, I was here first 😎
 *
 * -------------------------------------------------------------------------------------------------
 */

/**
 * SETTINGS BACKEND/SERVER
 * This file is unversioned and private, for me only HU HU HU 😎
 * Contains every sensitive informations : DB Adress, encryption param and keys
 */
class Settings {
    // AES Encryption key : password encryption when sent from front to serv
    static AES_KEY = [
        6, 1, 40, 3, 4, 10, 69, 42, 48, 12, 69, 25, 33, 6, 14, 105,
    ];
    static AES_ROUNDS = 5;

    static DB_URL =
        "mongodb+srv://Hazreath:zFHBKgxe7ezsBDvl" +
        "@ridemate.2poar.mongodb.net/RideMate?retryWrites=true&w=majority";

    // Hash & Security param
    static HASH_ROUNDS = 10;
    //static SECRET_KEY = "aligot"; FOR LOZERE TESTS ONLY LOL ALIGOT IS GOOD PLEASE TASTE IT ONE TIME IN YOUR LIFE
    // static SECRET_KEY = "\\€€|*$$B3nj1_-_L3##S4nG//"; // Does not work, not sure why
    static SECRET_KEY = "B3nj1L4*,Sw4gg4ance"; // 😎

    static AVATARS_FOLDER = "./public/avatars";
    static DEFAULT_AVATAR_VALUE = "none";

    static AVATAR_MIME_TYPES = {
        "image/jpg": "jpg",
        "image/jpeg": "jpg",
        "image/png": "png",
    };
}

module.exports = Settings;
