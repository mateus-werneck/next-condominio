import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { AutoCompleteStyles } from './styles';
import { IStandardSelect } from './types';

export default function StandardSelect(props: IStandardSelect) {
  useEffect(() => {
    if (!props.initialValue) {
      return;
    }

    let initialValue = undefined;

    if (!props.multiSelect) {
      initialValue = props.options?.find(
        (option) => option.id == props.initialValue
      );
    }

    if (props.multiSelect) {
      initialValue = props.options?.filter((option) =>
        props.initialValue?.includes(option.id)
      );
    }

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
            onChange={(_, data) => field.onChange(data)}
            multiple={props.multiSelect ?? false}
            autoHighlight
            readOnly={props.readOnly ?? false}
            options={props.options || []}
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
