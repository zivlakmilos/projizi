import fs from 'fs-extra';
import path from 'path';

const createRowLevelSecurity = (table) => {
  let res = '';

  if (table.row_level_security) {
    res += `alter table "public"."${table.id}" enable row level security;\n\n`;
  }

  res += `CREATE POLICY "policy_table_${table.id}_insert"\n`;
  res += `ON "public"."${table.id}"\n`;
  res += `FOR SELECT USING (\n`;
  res += `  ${table.security.select ? 'auth.uid() = ' + table.security.select : 'true'}\n`;
  res += `);\n\n`;

  res += `CREATE POLICY "policy_table_${table.id}_insert"\n`;
  res += `ON "public"."${table.id}"\n`;
  res += `FOR INSERT\n`;
  res += `TO authenticated\n`;
  res += `WITH CHECK(true);\n\n`;

  res += `CREATE POLICY "policy_table_${table.id}_update"\n`;
  res += `ON public.available_tags\n`;
  res += `FOR UPDATE USING(\n`;
  res += `  auth.uid() = ${table.security.update}\n`;
  res += `) WITH CHECK(\n`;
  res += `  auth.uid() = ${table.security.update}\n`;
  res += `);\n\n`;

  res += `CREATE POLICY "policy_table_${table.id}_delete"\n`;
  res += `ON public.available_tags\n`;
  res += `FOR DELETE USING(\n`;
  res += `  auth.uid() = ${table.security.delete}\n`;
  res += `);\n\n`;

  return res;
}

const createField = (field) => {
  let res = '';

  res += `  "${field.id}" ${field.type} ${field.not_null ? 'not null' : ''} ${field.default_value ? 'default ' + field.default_value : ''} ${field.primary_key ? 'primary key' : ''}`;

  return res;
}

const createTable = (table) => {
  let res = '';

  res += `create table "public"."${table.id}" (\n`;

  table.fields.forEach((el, index) => {
    if (index > 0) {
      res += `,\n`
    }
    res += createField(el);
  });

  res += '\n';
  res += ');\n\n';

  res += createRowLevelSecurity(table);

  return res;
}

export const exec = async (args, config) => {
  let res = '';

  config.data.forEach(el => {
    res += createTable(el);
  });

  fs.writeFileSync(path.join(args.output, 'supabase.sql'), res);
}
