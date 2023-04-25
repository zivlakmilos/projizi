import fs from 'fs-extra';
import path from 'path';

import { generateGenericForm } from '../../data/react-material.js';

const createGenericForm = () => {
  return generateGenericForm();
}

const createGenericTable = () => {
  const res = '';
  return res;
}

export const exec = async (args, config) => {
  const genericForm = createGenericForm(config);
  const genericTable = createGenericTable(config);

  if (!fs.existsSync(path.join(args.output, 'react-material'))) {
    fs.mkdirSync(path.join(args.output, 'react-material'));
  }

  fs.writeFileSync(path.join(args.output, 'react-material', 'GenericForm.js'), genericForm);
  fs.writeFileSync(path.join(args.output, 'react-material', 'GenericTable.js'), genericTable);
}
