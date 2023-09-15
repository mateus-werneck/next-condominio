import { ObjectUtil } from '@Lib/Treat/Object';
import { Autocomplete, SxProps, TextField, Theme } from '@mui/material';
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

  return (
    <Controller
      control={props.control}
      name={props.name}
      key={props.name}
      defaultValue={props.initialValue ?? ''}
      rules={{
        required: props.required === undefined ? false : props.required
      }}
      render={({ field: { onChange, ..._field } }) => (
        <Autocomplete
          sx={customStyles}
          className="sm:max-w-[228px] xl:max-w-sm"
          value={_field.value || []}
          defaultValue={props.initialValue}
          loading={props.options === undefined}
          multiple={props.multiSelect === undefined ? false : props.multiSelect}
          onChange={(_, data) => onChange(data)}
          autoHighlight
          readOnly={props.readOnly === undefined ? false : props.readOnly}
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
