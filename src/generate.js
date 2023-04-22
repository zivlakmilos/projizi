const plugins = {
  prefix: './plugins/generate/',
  plugins: [
    {
      name: 'supabase',
      file: 'supabase',
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
  const pluginPath = plugins.prefix + '';
  const { exec } = await import(pluginPath);

  return await exec();
}
