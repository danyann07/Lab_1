const fs = require('fs');

class Validator {

    static fileEx = (file) => {
        try {
            fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
            return true;
        } catch (err) {
            return false;
        }
    }

    static isStr(value) {
        return  typeof(value) === 'string'
    }
}
module.exports = Validator;