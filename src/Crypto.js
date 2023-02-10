var CryptoJS = require("crypto-js");


exports.Encrypt = function (data)  {
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_SECRET_KEY).toString();
    return ciphertext
}

exports.Decrypt = function(data) {
    var bytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET_KEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}