const fs = require('fs');
const stream = require('stream');
const util = require('util');
const program = require('commander');

const TransformStream = require("../Lab_1/module/transformStream");
const Validator = require("../Lab_1/module/validator")

const pipeline = util.promisify(stream.pipeline);


const actions = async () => {
    const {input, output, task} = program.opts();

    if (task !== 'l1' && task !== 'l2') {
        process.stderr.write(`Task must be "l1" or "l2"\n`);
        process.exit(1);
    }

    input === undefined && process.stdout.write('Enter the text and press ENTER to l1/l2 | press CTRL + C to exit: ')

    const ReadableStream =  Validator.isStr(input) && Validator.fileEx(input) ? fs.createReadStream(input) : process.stdin;
    const WriteableStream = Validator.isStr(output) && Validator.fileEx(output) ? fs.createWriteStream(output): process.stdout;

    try {
        if (Validator.fileEx(input) || Validator.fileEx(output) || input === undefined || output === undefined){
            await pipeline(
                ReadableStream,
                new TransformStream(task),
                WriteableStream
            )
        } else{
            process.stderr.write( `file does not exist!!!\n`);
            process.exit(2);
        }
    } catch (e) {
        process.stderr.write( `${e.message}\n`);
        process.exit(1);
    }
}

process.stdin.setEncoding('utf8');
process.on('exit', code => console.log(('Code: ') + code));
process.on('SIGINT', _ => { process.exit(0); });

program
    .requiredOption('-t --task <task>', 'An task l1/l2')
    .option('-i, --input <filename>', 'An input file')
    .option('-o, --output <filename>', 'An output file')
    .action(actions)

program.parse(process.argv);