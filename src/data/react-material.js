export const generateGenericForm = () => {
  const GenericForm =
    `import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const GenericForm = (props) => {
  const [values, setValues] = useState([]);

  const {
    data,
  } = props;

  useEffect(() => {
    if (data) {
      setValues([...data]);
    }
  }, [data]);

  const showError = (msg) => {
    if (props.onError) {
      props.onError(msg);
    }
  }

  const validate = () => {
    for (const el of values) {
      if (el.validation) {
        if (el.validation.required) {
          if (!el.value.length) {
            showError(el.label + ' is required!');
            return false;
          }
        }
        if (el.validation.min) {
          if (el.type === 'number') {
            if (el.value < el.validation.min) {
              showError(el.label + ' must be at greater than ' + el.validation.min + '!');
              return false;
            }
          } else {
            if (el.value.length < el.validation.min) {
              showError(el.label + ' must be at least ' + el.validation.min + ' characters long!');
              return false;
            }
          }
        }
        if (el.validation.max) {
          if (el.type === 'number') {
            if (el.value > el.validation.max) {
              showError(el.label + ' must be at greater than ' + el.validation.min + '!');
              return false;
            }
          } else {
            if (el.value.length > el.validation.max) {
              showError(el.label + ' must be at least ' + el.validation.min + ' characters long!');
              return false;
            }
          }
        }
      }
    }

    return true;
  }

  const onSave = () => {
    const isValid = validate();
    if (!isValid) {
      return;
    }

    if (props.onSave) {
      props.onSave(values);
    }
  }

  const onChangeHandler = (event, id, type, newValue = undefined) => {
    let value = event.target.value;

    if (type === 'switch') {
      value = event.target.checked;
    }

    if (newValue) {
      value = newValue;
    }

    const index = values.findIndex(el => el.id === id);
    if (index < 0) {
      return;
    }

    const updatedArray = [...values];
    const updatedData = {
      ...values[index],
      value: value,
    };
    updatedArray[index] = updatedData;
    setValues(updatedArray);
  }

  const components = values.map(el => {
    let cmp = null;

    if (el.type === 'text') {
      cmp = (
        <TextField
          fullWidth
          id={el.id}
          label={el.label}
          variant="standard"
          value={el.value}
          onChange={e => onChangeHandler(e, el.id, el.type)} />
      );
    } else if (el.type === 'number') {
      cmp = (
        <TextField
          fullWidth
          id={el.id}
          label={el.label}
          type="number"
          variant="standard"
          value={el.value}
          onChange={e => onChangeHandler(e, el.id, el.type)} />
      );
    } else if (el.type === 'autocomplete') {
      cmp = (
        <Autocomplete
          id={el.id}
          freeSolo
          options={el.options.map((option) => option.title)}
          value={el.value}
          onChange={(event, newValue) => onChangeHandler(event, el.id, 'autocomplete', newValue)}
          renderInput={(params) => <TextField {...params} label={el.label} />}
        />
      );
    } else if (el.type === 'select') {
      cmp = (
        <>
          <InputLabel id={el.id + '-label'}>Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id={el.id}
            value={el.value}
            label={el.label}
            onChange={e => onChangeHandler(e, el.id, el.type)}>
            {el.options.map(opt => {
              return (
                <MenuItem value={opt.value}>{opt.title}</MenuItem>
              );
            })}
          </Select>
        </>
      );
    } else if (el.type === 'switch') {
      cmp = (
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={el.value} onChange={e => onChangeHandler(e, el.id, el.type)} />}
            label={el.label} />
        </FormGroup>
      );
    }

    return (
      <Grid item xs={12} key={el.id}>
        <FormControl fullWidth>
          {cmp}
        </FormControl>
      </Grid>
    );
  });

  return (
    <>
      <Grid container spacing={1}>
        {components}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default GenericForm;`;

  return GenericForm
}

export const generateGenericTable = () => {
  const GenericTable =
    `import React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Pagination from '@mui/material/Pagination';

const GenericTable = (props) => {
  const header = props.columns.map((el) => {
    let align = 'left';
    if (el.align) {
      align = el.align
    }
    return (
      <TableCell key={el.id} align={align} style={{ minWidth: el.minWidth }}>
        {el.title}
      </TableCell>
    );
  });

  const data = props.data.map((row, index) => {
    const cells = [];
    props.columns.forEach((el) => {
      let align = 'left';
      if (el.align) {
        align = el.align;
      }

      cells.push(
        <TableCell key={el.id} align={align}>
          {el.callback ? el.callback(row[el.id]) : row[el.id]}
        </TableCell>
      );
    });

    return (
      <TableRow key={index}>
        {cells}
      </TableRow>
    );
  });

  let pagination = null;
  if (props.pagination) {
    pagination = (
      <Pagination
        page={props.pagination.currentPage}
        count={props.pagination.lastPage}
        color="primary"
        onChange={(event, value) => props.onPageChanged(value)} />
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table size={props.size}>
          <TableHead>
            <TableRow>
              {header}
            </TableRow>
          </TableHead>
          <TableBody>
            {data}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {pagination}
      <br />
    </Paper>
  );
}

export default GenericTable;`;

  return GenericTable;
}

export const generateEditPage = (name, title, table, frm) => {
  const EditPage =
    `import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { withStore } from '../store';
import { db } from '../db';
import Layout from '../hoc/Layout';
import CCard from '../hoc/Card';
import GenericForm from '../components/GenericForm';
import MessageDialog from '../components/MessageDialog';

const initialFrm = ${frm}

const ${name} = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isNew = !!id;

  const [frm, setFrm] = useState(initialFrm);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const res = await db.from('${table}')
      .select()
      .eq('id', id);

    if (res.error) {
      console.log(res.error);
      navigate('/departments');
    }

    if (res.data && res.data.length) {
      const updatedFrm = frm.map(el => {
        el.value = res.data[0][el.id];
      });
      setFrm(updatedFrm);
    }
  }

  useEffect(() => {
    if (id) {
      fetchData().catch(err => console.log(err));
    }
  }, [id]);

  const onSaveHandler = async (data) => {
    const req = data.reduce((acc, cur) => {
      acc[cur.id] = cur.value;
      return acc;
    }, {});

    if (isNew) {
      const res = await db.from('${table}')
        .insert(req);

      if (res.error) {
        console.log(res.error);
        setError(res.error.message);
      }
    } else {
      const res = await db.from('${table}')
        .update(req)
        .eq('id', id);
      if (res.error) {
        console.log(res.error);
        setError(res.error.message);
      }
    }
  }

  const onErrorHandler = (err) => {
    setError(err);
  }

  return (
    <Layout title="${title}">
      <CCard>
        <GenericForm
          data={frm}
          onSave={onSaveHandler}
          onError={onErrorHandler} />

        <MessageDialog
          open={!!error}
          title="Greška"
          text={error}
          onClose={() => setError(null)} />
      </CCard>
    </Layout>
  );
}

export default withStore(['nav'])(${name});`;

  return EditPage;
}

export const generateTablePage = (name, title, table, columns) => {
  const TablePage =
    `import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  IconButton,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

import { withStore } from '../store';
import { db } from '../db';
import Layout from '../hoc/Layout';
import CCard from '../hoc/Card';
import GenericTable from '../components/GenericTable';
import ConfirmDialog from '../components/ConfirmDialog';

const columns = ${columns}

const ${name} = (props) => {
  const navigate = useNavigate();

  const [removeId, setRemoveId] = useState(null);

  const [values, setValues] = useState([]);

  const fetchData = async () => {
    const res = await db.from('${table}')
      .select();

    if (res.error) {
      console.log(res.error);
      return;
    }

    setValues(res.data);
  }

  const deleteData = async (id) => {
    const res = await db.from('${table}')
      .delete()
      .eq('id', id);

    if (res.error) {
      console.log(res.error);
    }

    setValues(values.filter(el => el.id !== id));
  }

  useEffect(() => {
    fetchData()
      .catch(err => console.log(err));
  }, []);

  const onEditHandler = (id) => {
    navigate('/departments/' + id);
  }

  const onDeleteHandler = (id) => {
    deleteData(id)
      .catch(err => console.log(err));
    setRemoveId(null);
  }

  let removeDialog = null;
  if (removeId) {
    removeDialog = (
      <ConfirmDialog
        title="Brisanje odeljenja"
        text="Da li ste sigurni da želite obrisati odeljenje i sve radnike u njemu"
        open={!!removeId}
        onConfirm={onDeleteHandler}
        onCancel={() => setRemoveId(null)}
        payload={removeId}
        danger
      />
    );
  }

  const data = values.map(el => {
    const res = {
      ...el,
      actions: (
        <>
          <IconButton onClick={() => onEditHandler(el.id)}>
            <EditIcon />
          </IconButton>
          &nbsp;
          <IconButton color="error" onClick={() => setRemoveId(el.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    };

    return res;
  });

  return (
    <Layout title="${title}">
      <CCard>
        <Button variant="contained">Novo odeljenje</Button>
        <br />
        <br />
        <GenericTable
          columns={columns}
          data={data} />
      </CCard>

      {removeDialog}
    </Layout>
  );
}

export default withStore(['nav'])(${name});`;

  return TablePage;
}
