import { FieldErrors } from 'react-hook-form';

interface IError {
  name: string;
  errors: FieldErrors<any>;
}

export default function Error({ name, errors }: IError) {
  if (!errors[name]) {
    return <></>;
  }

  const message = String(errors[name]?.message ?? '');

  return (
    <div className="flex flex-col py-4">
      {message.split('|').map((m: string, index: number) => (
        <span
          className="indent-2 text-xs text-red"
          key={name + '-' + index + '-warning'}
        >
          {m}
        </span>
      ))}
    </div>
  );
}
