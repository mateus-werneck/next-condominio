import { IFormInput } from './types';

export function getInputProps<T extends IFormInput>(props: T) {
  return {
    className:
      'w-72 md:w-56 xl:w-96 h-8 text-xs rounded-md outline-none text-black indent-2 hover:border-sky-200 border-transparent border-2 focus:outline-none focus:ring-2 focus:ring-sky-200',
    placeholder: props.placeHolder ?? '',
    readOnly: props.readOnly ?? false,
    required: props.required ?? false,
    style: {
      marginBottom: props.hasErrors ? '0.3rem' : '0.8rem',
      ...props.styles
    }
  };
}

export function getLabel(children: JSX.Element, label?: string): JSX.Element {
  if (!label) return children;

  return (
    <label className="flex flex-col gap-1 text-xs to-gray-300">
      {label}
      {children}
    </label>
  );
}
