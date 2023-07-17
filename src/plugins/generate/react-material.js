import fs from 'fs-extra';
import path from 'path';

import {
  generateGenericForm,
  generateGenericTable,
  generateEditPage,
  generateTablePage,
} from '../../data/react-material.js';

const createGenericForm = () => {
  return generateGenericForm();
}

const createGenericTable = () => {
  return generateGenericTable();
}

const createFormPage = (table) => {
  const typeToString = (type) => {
    if (type === 'int8' || type === 'int16' || type === 'int32') {
      return 'number';
    }

    return 'text';
  }

  let frm = `[\n`;

  for (const field of table.fields) {
    if (field.read_only) {
      continue;
    }

    frm += `  {\n`;
    frm += `    id: '${field.id}',\n`;
    frm += `    type: '${typeToString(field.type)}',\n`;
    frm += `    label: '${field.title}',\n`;
    frm += `    value: '',\n`;
    frm += `    valication: {\n`;
    if (field.not_null) {
      frm += `        required: true,\n`;
    }
    frm += `    },\n`;
    frm += `  },\n`;
  }

  frm += `]`;

  return generateEditPage(table.component_name + 'Edit', table.title, table.id, frm);
}

const createTablePage = (table) => {
  let columns = `[\n`;

  for (const field of table.fields) {
    columns += `  {\n`;
    columns += `    id: '${field.id}',\n`;
    columns += `    title: '${field.title}',\n`;
    columns += `  },\n`;
  }

  columns += `  {\n`;
  columns += `    id: 'actions',\n`;
  columns += `    title: '',\n`;
  columns += `  },\n`;

  columns += `]\n`;

  return generateTablePage(table.component_name + 's', table.title, table.id, columns);
}

export const exec = async (args, config) => {
  const genericForm = createGenericForm(config);
  const genericTable = createGenericTable(config);

  if (!fs.existsSync(path.join(args.output, 'react-material'))) {
    fs.mkdirSync(path.join(args.output, 'react-material'));
  }

  if (!fs.existsSync(path.join(args.output, 'react-material', 'generic'))) {
    fs.mkdirSync(path.join(args.output, 'react-material', 'generic'));
  }

  fs.writeFileSync(path.join(args.output, 'react-material', 'generic', 'GenericForm.js'), genericForm);
  fs.writeFileSync(path.join(args.output, 'react-material', 'generic', 'GenericTable.js'), genericTable);

  if (!fs.existsSync(path.join(args.output, 'react-material', 'pages'))) {
    fs.mkdirSync(path.join(args.output, 'react-material', 'pages'));
  }

  config.data.forEach(el => {
    if (el.component_name) {
      const tablePage = createTablePage(el);
      const formPage = createFormPage(el);

      fs.writeFileSync(path.join(args.output, 'react-material', 'pages', el.component_name + 's.js'), tablePage);
      fs.writeFileSync(path.join(args.output, 'react-material', 'pages', el.component_name + 'Edit.js'), formPage);
    }
  });
}
