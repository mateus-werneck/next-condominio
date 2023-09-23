import { ObjectUtil } from '@Lib/Treat/Object';
import { Autocomplete, SxProps, TextField, Theme } from '@mui/material';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { IStandardSelect } from './types';

export default function StandardSelect(props: IStandardSelect) {
  const customStyles: SxProps<Theme> = {
    '& .MuiInputBase-root': {
      borderRadius: '0.375rem'
    },
    '& .MuiOutlinedInput-root': {
      borderColor: 'rgb(186 230 253)',
      '&:hover fieldset': {
        border: '2px solid rgb(186 230 253)'
      }
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(186 230 253)',
      '--tw-ring-opacity': 1,
      '--tw-ring-color': 'rgb(186 230 253 / var(--tw-ring-opacity))',
      '--tw-ring-offset-shadow':
        'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
      '--tw-ring-shadow':
        'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
      boxShadow:
        'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)'
    },
    '& .MuiFormLabel-root': {
      fontSize: '0.75rem'
    }
  };

  useEffect(() => {
    if (!props.initialValue) {
      return;
    }

    if (props.multiSelect) {
      return;
    }

    const initialValue = props.options?.find(
      (option) => option.id === props.initialValue
    );
    props.setValue(props.name, initialValue);
  }, [props.options]);

  return (
    <Controller
      control={props.control}
      name={props.name}
      key={props.name}
      rules={{
        required: props.required ?? false
      }}
      render={({ field: { onChange, value, ..._field } }) => (
        <Autocomplete
          {..._field}
          sx={customStyles}
          className="sm:max-w-[228px] xl:max-w-sm py-2"
          value={value || []}
          loading={props.options === undefined}
          multiple={props.multiSelect ?? false}
          onChange={(_, data) => onChange(data)}
          autoHighlight
          readOnly={props.readOnly ?? false}
          options={ObjectUtil.sort(props.options, 'label') || []}
          fullWidth
          isOptionEqualToValue={(option, value) => option.id == value.id}
          getOptionLabel={(option) => (option.label ? option.label : '')}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.label} style={{ fontSize: '0.75rem' }}>
                {option.label}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label={props.label}
              variant="standard"
              inputProps={{
                ...params.inputProps,
                autoCorrect: 'disabled',
                style: { fontSize: '0.75rem' }
              }}
              {..._field}
            />
          )}
        />
      )}
    />
  );
}
