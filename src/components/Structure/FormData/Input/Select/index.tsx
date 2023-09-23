import { ObjectUtil } from '@Lib/Treat/Object';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { IStandardSelect } from './types';
import { AutoCompleteStyles } from './styles';

export default function StandardSelect(props: IStandardSelect) {
  useEffect(() => {
    if (!props.initialValue) {
      return;
    }

    const initialValue = props.multiSelect
      ? props.initialValue
      : props.options?.find((option) => option.id === props.initialValue);

    props.setValue(props.name, initialValue, {
      shouldValidate: true
    });
  }, [props.options]);

  return (
    <Controller
      control={props.control}
      name={props.name}
      key={props.name}
      rules={{
        required: props.required ?? false
      }}
      render={({ field }) => {
        return (
          <Autocomplete
            {...field}
            sx={AutoCompleteStyles}
            className="sm:max-w-[228px] xl:max-w-sm py-2"
            loading={props.options === undefined}
            value={field.value || []}
            multiple={props.multiSelect ?? false}
            autoHighlight
            readOnly={props.readOnly ?? false}
            options={ObjectUtil.sort(props.options, 'label') || []}
            fullWidth
            isOptionEqualToValue={(option, value) => option.id == value.id}
            getOptionLabel={(option) => (option.label ? option.label : '')}
            renderOption={(props, option) => {
              return (
                <li
                  {...props}
                  key={option.label}
                  style={{ fontSize: '0.75rem' }}
                >
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
                {...field}
              />
            )}
          />
        );
      }}
    />
  );
}
