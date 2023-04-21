import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { init } from "./init.js";
import { generate, listGenerators } from "./generate.js";

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
        })
        .positional('generators', {
          description: 'List of generators for project',
          default: 'supabase',
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
    .command('list', 'List values', (yargs) => {
      return yargs
        .positional('option', {
          description: 'Option to show list',
        });
    })
    .epilog('Copyright (c) 2023 Milos Zivlak')
    .parse();

  return args;
}

const execListCommand = (args) => {
  if (args._.length === 1) {
    console.log('Available lists:')
    console.log('  generators');
  } else {
    const list = args._[1];

    if (list === 'generators') {
      console.log('Available generators:');
      listGenerators().forEach(el => {
        console.log('  ' + el);
      });
    }
  }
}

export const cli = async (rawArgs) => {
  const args = parseArguments(rawArgs);

  if (args._ && args._.length) {
    const cmd = args._[0];

    if (cmd === 'list') {
      execListCommand(args);
    } else if (cmd === 'init') {
      init(args);
    } else if (cmd === 'generate') {
      generate(args);
    }
  }
}
