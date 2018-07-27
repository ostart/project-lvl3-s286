#!/usr/bin/env node
import program from 'commander';
import pageLoad from '..';
import { version } from '../../package.json';
import errorMessage from '../lib/errorMessage';

const currentDir = process.cwd();
program
  .version(version)
  .description('Download pages with sources in local folder.')
  .option('-o, --output [folder]', 'output local folder', currentDir)
  .arguments('<urlLink>')
  .action((firstArg, options) => {
    const urlLink = firstArg;
    const localFolder = options.output;
    pageLoad(urlLink, localFolder)
      .then(() => process.exit(0))
      .catch((e) => {
        console.error(errorMessage(e));
        process.exit(1);
      });
  });

program.parse(process.argv);

if (!program.args.length) program.help();
