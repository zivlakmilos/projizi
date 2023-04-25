import fs from 'fs-extra';

const plugins = {
  prefix: './plugins/generate/',
  plugins: [
    {
      name: 'supabase',
      file: 'supabase.js',
    },
    {
      name: 'react-material',
      file: 'react-material.js',
    },
  ],
};

export const listGeneratePlugins = () => {
  return plugins.plugins;
}

export const listGenerators = () => {
  return plugins.plugins.map(el => el.name);
}

export const generate = async (args) => {
  const configPath = args.config;
  const config = fs.readJsonSync(configPath);

  if (!config.generators || !config.generators.length) {
    console.error('Generators is missing from config!');
    return;
  }

  if (!fs.existsSync(args.output)) {
    fs.mkdirSync(args.output);
  }

  for (const el of config.generators) {
    const plugin = plugins.plugins.find(e => e.name === el);
    if (!plugin) {
      console.error(`Generator ${el} don't exists!`);
      return;
    }
    const pluginPath = plugins.prefix + plugin.file;
    const { exec } = await import(pluginPath);

    await exec(args, config);
  }
}
