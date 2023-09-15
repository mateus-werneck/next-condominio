import { FieldErrors } from 'react-hook-form';

interface IError {
  name: string;
  errors: FieldErrors<any>;
}

export default function Error({ name, errors }: IError) {
  if (!errors[name]) {
    return <></>;
  }

  return (
    <span
      className="indent-2 text-xs text-red-600/100 mb-4 mt-[0.3rem]"
      key={name + '-warning'}
    >
      {String(errors[name]?.message)}
    </span>
  );
}
