import { ObjectUtil } from '@Utils/Object';
import { Autocomplete, SxProps, TextField, Theme } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IStandardSelect } from './types';

export const StandardSelect = ({
  name,
  options,
  control,
  multiSelect,
  label,
  initialValue,
  readOnly,
  required
}: IStandardSelect) => {
  const customStyles: SxProps<Theme> = {
    width: 320,
    '& .MuiFormControl-root': {
      borderRadius: '0.5rem'
    },
    '& .MuiFormLabel-root': {
      fontSize: '0.75rem'
    },
    '& .MuiOutlinedInput-root': {
      borderColor: 'rgb(186 230 253)'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      '&:hover': {
        border: '2px solid rgb(186 230 253)'
      }
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgb(186 230 253)'
    }
  };
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={initialValue}
      key={name}
      rules={{
        required: required === undefined ? false : required
      }}
      render={({ field: { onChange, ..._field } }) => (
        <Autocomplete
          sx={customStyles}
          multiple={multiSelect === undefined ? false : multiSelect}
          onChange={(_, data) => onChange(data)}
          autoHighlight
          readOnly={readOnly === undefined ? false : readOnly}
          options={ObjectUtil.sort(options, 'label')}
          fullWidth
          isOptionEqualToValue={(option, value) => option.id == value.id}
          getOptionLabel={(option) => option.label}
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
              label={label}
              variant="outlined"
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
};
