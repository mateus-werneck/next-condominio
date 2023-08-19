import ReactInputMask from 'react-input-mask';
import { IFormInput } from './types';

export const StandardInput = (props: IFormInput) => {
  const standardInput = !props.mask ? getInputHtml(props) : getInputMask(props);
  return getLabel(standardInput, props.label);
};

function getInputHtml(props: IFormInput): JSX.Element {
  return (
    <input
      {...props.register(props.name)}
      type={props.type ? props.type : 'text'}
      {...getInputProps(props)}
    />
  );
}

function getInputMask(props: IFormInput): JSX.Element {
  const mask = props.mask == undefined ? '' : props.mask;
  return (
    <ReactInputMask
      {...props.register(props.name)}
      mask={mask}
      maskChar={props.maskChar ?? ''}
      {...getInputProps(props)}
    />
  );
}

function getInputProps(props: IFormInput) {
  return {
    className:
      'w-72 md:w-56 xl:w-96 h-8 text-xs rounded-md outline-none text-black indent-2 hover:border-sky-200 border-transparent border-2 focus:outline-none focus:ring-2 focus:ring-sky-200',
    defaultValue: props.initialValue ? props.initialValue : '',
    placeholder: props.placeHolder ? props.placeHolder : '',
    readOnly: props.readOnly === undefined ? false : props.readOnly,
    required: props.required === undefined ? false : props.required,
    style: {
      marginBottom: props.hasErrors ? '0.3rem' : '0.8rem',
      ...props.styles
    }
  };
}

function getLabel(children: JSX.Element, label?: string): JSX.Element {
  if (!label) return children;

  return (
    <label className="flex flex-col gap-1 text-xs to-gray-300">
      {label}
      {children}
    </label>
  );
}
