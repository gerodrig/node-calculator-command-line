//save an output file
//path outputs/table-5.txt
import { createWriteStream } from 'fs';
import { join } from 'path';
import { yarg } from './config/plugins/args.plugin';

const { base = 6, show, limit } = yarg;
//output to console
const header  = '='.repeat(20) + '\n' + ' '.repeat(5) + `${base} Table` + '\n' + '='.repeat(20) + '\n';
let outputString = header + '\n';

//if file does not exist, it will be created
const output = createWriteStream(join(__dirname, `../outputs/table-${base}.txt`));


for(let i = 1; i <= (limit as number); i++){
    outputString += `${i} x ${base} = ${i * (base as number)}\n`;
}
if(show){
    console.log(outputString);
}


output.write(outputString);
output.end();
console.log('File Created');


//save output
