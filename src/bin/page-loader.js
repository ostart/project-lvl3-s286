#!/usr/bin/env node
import program from 'commander';
import pageLoad from '..';

const currentDir = process.cwd();
program
  .version('1.1.2')
  .description('Download pages with sources in local folder.')
  .option('-o, --output [folder]', 'output local folder', currentDir)
  .arguments('<urlLink>')
  .action((firstArg, options) => {
    const urlLink = firstArg;
    const localFolder = options.output;
    pageLoad(urlLink, localFolder)
      .catch(e => console.log(e));
  });

program.parse(process.argv);

if (!program.args.length) program.help();
