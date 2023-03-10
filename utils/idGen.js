module.exports = function (num) {
    let retVal = "";
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var length = num ? Math.round(num) : 5;
    for (var i = 0, n = characters.length; i < length; ++i) {
        retVal += characters.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}