import { getInputProps, getLabel } from '../utils/input-props';
import { IFormInput } from '../utils/types';

export default function StandardInput(props: IFormInput) {
  return getLabel(getInputHtml(props), props.label);
}

function getInputHtml(props: IFormInput): JSX.Element {
  return (
    <input
      {...props.register(props.name)}
      type={props.type ? props.type : 'text'}
      {...getInputProps(props)}
    />
  );
}
