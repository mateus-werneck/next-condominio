import { Controller } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import { IStandardMasked } from './types';

export default function StandardMaskedInput({
  control,
  initialValue,
  required,
  placeHolder,
  ...props
}: IStandardMasked) {
  return (
    <Controller
      name={props.name}
      control={control}
      defaultValue={initialValue ?? ''}
      rules={{ required: required ?? false }}
      render={({ field }) => (
        <ReactInputMask
          {...field}
          {...props}
          mask={props.mask ?? ''}
          maskChar={props.maskChar ?? ''}
          placeholder={placeHolder ?? ''}
        />
      )}
    />
  );
}
