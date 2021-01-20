const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const password = 'JS4life';

const crypt = {
    getToken: (userId,timestamps) => {

        let stringToCrypt = userId + "-" + timestamps ;
        let encryptedString = crypt.encryptText(stringToCrypt);
        console.log(stringToCrypt);
        return encryptedString;

    },
    getTokenTravel: (user_id,travel_id,) => {

        let stringToCrypt = user_id + "-" + travel_id ;
        let encryptedString = crypt.encryptText(stringToCrypt);
        // console.log(stringToCrypt);
        return encryptedString;

    },
    encryptText: (string) => {
        const cipher = crypto.createCipher(algorithm,password);

        let encrypted = cipher.update(string,'utf8','hex');

        encrypted += cipher.final('hex');

        return encrypted;
    },

    decryptText: (stringEncrypted) => {
        const decipher = crypto.createDecipher(algorithm,password);
        let decrypted = decipher.update(stringEncrypted,'hex','utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }
};



module.exports = crypt;