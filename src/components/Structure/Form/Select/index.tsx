import { ObjectUtil } from '@Utils/Object';
import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IStandardSelect } from './types';

export const StandardSelect = ({
  name,
  options,
  control,
  label,
  initialValue,
  readOnly,
  required
}: IStandardSelect) => {
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
          onChange={(_, data) => onChange(data)}
          autoHighlight
          readOnly={readOnly === undefined ? false : readOnly}
          options={ObjectUtil.sort(options, 'label')}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.label}>
                {option.label}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="standard"
              inputProps={{
                ...params.inputProps,
                autoCorrect: 'disabled'
              }}
              {..._field}
            />
          )}
        />
      )}
    />
  );
};
