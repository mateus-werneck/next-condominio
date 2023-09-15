import { IStandardInput } from './types';

export default function StandardInput({
  register,
  type,
  initialValue,
  ...props
}: IStandardInput) {
  return (
    <input
      {...register(props.name)}
      {...props}
      defaultValue={initialValue}
      type={type ? type : 'text'}
    />
  );
}
