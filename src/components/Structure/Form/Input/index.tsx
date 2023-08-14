import { IFormInput } from './types';

export const StandardInput = ({
  name,
  label,
  placeHolder,
  type,
  initialValue,
  styles,
  readOnly,
  required,
  hasErrors,
  register
}: IFormInput) => {
  const Input = (
    <input
      className="w-80 h-8 text-xs rounded-lg to-gray-500 indent-2 outline-none shadow-none focus:ring-orange-300"
      {...register(name)}
      defaultValue={initialValue}
      type={type ? type : 'text'}
      placeholder={placeHolder ? placeHolder : ''}
      readOnly={readOnly === undefined ? false : readOnly}
      required={required === undefined ? false : required}
      style={{
        marginBottom: hasErrors ? '0.3rem' : '0.8rem',
        ...styles
      }}
    />
  );

  return getLabel(Input, label);
};

function getLabel(children: JSX.Element, label?: string): JSX.Element {
  if (!label) return children;

  return (
    <label className="flex flex-col gap-1 text-xs to-gray-300">
      {label}
      {children}
    </label>
  );
}
