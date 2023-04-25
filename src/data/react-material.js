
export const generateGenericForm = () => {
  const GenericForm = `
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Buton';
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
    setValues({ ...data });
  }, [data]);

  const showError = (msg) => {
    if (props.onError) {
      props.onError(msg);
    }
  }

  const validate = () => {
    for (el of values) {
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

    const index = values.find(el => id === id);
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
            value={age}
            label="Age"
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
      <Grid xs={12}>
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
        <br />
        <Grid xs={12}>
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

export default GenericForm;
`;

  return GenericForm
}
