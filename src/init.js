import fs from 'fs-extra';

const plugins = {
  prefix: './plugins/init/',
  plugins: [],
};

export const listInitPlugins = () => {
  return plugins.plugins;
}

export const init = async (args) => {
  console.log(args);
  const filePath = args.config;

  const config = {
    generators: [
      ...args.generators,
    ],
    data: [
      {
        id: 'profiles',
        title: 'Users',
        row_level_security: true,

        fields: [
          {
            id: 'id',
            type: 'uuid',
            primary_key: true,
            not_null: true,
            default_value: '',
            title: 'Id',
            relation: 'users.id',
            cascade: [],
            read_only: true,
          },
          {
            id: 'name',
            type: 'text',
            primary_key: false,
            not_null: true,
            default_value: '',
            title: 'Name',
            cascade: [],
            read_only: false,
          },
          {
            id: 'surname',
            type: 'text',
            primary_key: false,
            not_null: true,
            default_value: '',
            title: 'Surname',
            cascade: [],
            read_only: false,
          },
        ]
      },
      {
        id: 'posts',
        title: 'Posts',
        row_level_security: true,

        fields: [
          {
            id: 'id',
            type: 'int8',
            primary_key: true,
            not_null: true,
            default_value: '',
            title: 'Id',
            cascade: [],
            read_only: true,
            hidden: true,
          },
          {
            id: 'users_id',
            type: 'uuid',
            primary_key: false,
            not_null: true,
            default_value: '',
            title: 'User',
            relation: 'users.id',
            cascade: [],
            read_only: true,
          },
          {
            id: 'title',
            type: 'text',
            primary_key: false,
            not_null: true,
            default_value: '',
            title: 'Title',
            cascade: [],
            read_only: false,
          },
          {
            id: 'content',
            type: 'text',
            primary_key: false,
            not_null: false,
            default_value: '',
            title: 'Content',
            cascade: [],
            read_only: false,
          },
        ],
      }
    ],
  }

  fs.writeJsonSync(filePath, config, {
    spaces: '  ',
  });
}
