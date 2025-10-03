import * as openpgp from "openpgp";
import CryptoJS from "crypto-js";

export async function generateKeyPair(name, email) {
    const { privateKey, publicKey } = await openpgp.generateKey({
        type: "ecc",
        curve: "ed25519",
        userIDs: [{ name, email }],
    });

    return { privateKey, publicKey };
}
// ! ENCRYPTION
export function encryptPrivateKey(privateKey, password) {
    return CryptoJS.AES.encrypt(privateKey, password).toString();
}

export function decryptPrivateKey(encrypted, password) {
    const bytes = CryptoJS.AES.decrypt(encrypted, password);
    return bytes.toString(CryptoJS.enc.Utf8);
}
