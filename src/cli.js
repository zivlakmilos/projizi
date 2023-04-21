import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const parseArguments = (rawArgs) => {
  const args = yargs(hideBin(rawArgs))
    .usage("Usage: projizi [command] [options]")
    .version().alias('v', 'version')
    .help().alias('h', 'help')
    .command('init [options]', 'Init config file', (yargs) => {
      return yargs
        .option('config', {
          alias: 'c',
          type: 'string',
          description: 'Config file',
        });
    })
    .command('generate [options]', 'Generate projects and files', (yargs) => {
      return yargs
        .option('output', {
          alias: 'o',
          type: 'string',
          description: 'Output folder',
        })
    })
    .epilog('Copyright (c) 2023 Milos Zivlak')
    .parse();

  return args;
}

export const cli = async (rawArgs) => {
  const args = parseArguments(rawArgs);

  console.log(args);
}
