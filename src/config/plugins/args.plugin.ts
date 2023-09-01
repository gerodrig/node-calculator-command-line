import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
  .options('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Multiplicaiton table base',
  })
  .options('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Multiplicaiton table limit',
  })
  .options('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show multiplication table in console',
  }).options('n',{
    alias: 'name',
    type: 'string',
    default: 'multiplication-table',
    describe: 'Name of the file to be created'
  }).options('d',{
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'Destination folder for the file to be created'
  }).check((argv, options) => {
    if (isNaN(argv.b)) {
        throw 'Base must be a number';
    }
    if (isNaN(argv.l)) {
        throw 'Limit must be a number';
    }

    if (argv.b < 0) {
        throw 'base must be greater than 0';
    }
    return true;
    })
  .parseSync();
