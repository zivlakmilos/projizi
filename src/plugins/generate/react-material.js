import fs from 'fs-extra';
import path from 'path';

const createGenericForm = () => {
}

const createGenericTable = () => {
}

export const exec = async (args, config) => {
  const genericForm = createGenericForm(config);
  const genericTable = createGenericTable(config);

  fs.mkdirSync(path.join(args.output, 'react-material'), options);
  fs.writeFileSync(path.join(args.output, 'react-material', 'GenericForm.js'), genericForm);
  fs.writeFileSync(path.join(args.output, 'react-material', 'GenericTable.js'), genericTable);
}
