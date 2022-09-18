import Settings from "../settings";
const aesjs = require("aes-js");

/**
 * Encrypts argument string using AES Algorithm
 * @param {string} toCrypt string to crypt
 * @returns encrypted string (string, hexadecimal)
 */
export function AESEncrypt(toCrypt) {
    console.log(Settings.AES_KEY);
    console.log(Settings.AES_ROUNDS);
    let bytes = aesjs.utils.utf8.toBytes(toCrypt);
    let aesCtr = new aesjs.ModeOfOperation.ctr(
        Settings.AES_KEY,
        new aesjs.Counter(parseInt(Settings.AES_ROUNDS))
    );
    let encryptedBytes = aesCtr.encrypt(bytes);

    return aesjs.utils.hex.fromBytes(encryptedBytes);
}
