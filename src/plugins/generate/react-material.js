import fs from 'fs-extra';
import path from 'path';

import { generateGenericForm } from '../../data/react-material.js';
import { generateGenericTable } from '../../data/react-material.js';

const createGenericForm = () => {
  return generateGenericForm();
}

const createGenericTable = () => {
  return generateGenericTable();
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
}
