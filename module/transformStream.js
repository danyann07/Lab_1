const { Transform } = require('stream');

const { duplicateEncode } = require('./duplicateEncode.js');
const { multiplication } = require('./multiplication.js');

class TransformStream extends Transform {
    constructor(task) {
        super();
        this.task = task;
    }

    _transform(chunk, _, done) {
        let result = '';

        switch (this.task) {
            case 'l1':
                result = duplicateEncode(chunk.toString('utf8'));
                break;
            case 'l2':
                if ( +chunk > 0) {
                    result = multiplication(+chunk);
                } else {
                    process.stderr.write('Erorr: Please enter a number greater than 0 !!!\n')
                    process.exit(1);
                }
                break;
            default:
                process.stderr.write(' Erorr: Action not found\n');
                process.exit(1);
        }

        this.push(result);
        done();
    }
}

module.exports = TransformStream;