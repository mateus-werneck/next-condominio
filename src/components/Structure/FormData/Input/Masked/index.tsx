import { Controller } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import { IStandardMasked } from './types';

export default function StandardMaskedInput({
  name,
  control,
  initialValue,
  required,
  mask,
  ...props
}: IStandardMasked) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={initialValue ?? ''}
      rules={{ required: required ?? false }}
      render={({ field }) => (
        <ReactInputMask {...field} {...props} mask={mask ?? ''} />
      )}
    />
  );
}
