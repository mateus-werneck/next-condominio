import { CSSProperties } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { StyledInput, StyledLabel } from './style';

export interface IStandardInput {
  name: string;
  label?: string;
  placeHolder?: string;
  type?:
    | 'text'
    | 'number'
    | 'email'
    | 'date'
    | 'search'
    | 'checkbox'
    | 'file'
    | 'image'
    | 'password'
    | 'radio'
    | 'range'
    | 'textarea'
    | 'time'
    | 'url'
    | 'tel';
  styles?: CSSProperties;
  readOnly?: boolean;
  required?: boolean;
  hasErrors: boolean;
  register: UseFormRegister<FieldValues>;
}

export const StandardInput = ({
  name,
  label,
  placeHolder,
  type,
  styles,
  readOnly,
  required,
  hasErrors,
  register
}: IStandardInput) => {
  const Input = (
    <StyledInput
      {...register(name)}
      type={type ? type : 'text'}
      placeholder={placeHolder ? placeHolder : ''}
      readOnly={readOnly ? readOnly : false}
      required={required ? required : true}
      style={{ marginBottom: hasErrors ? '0.3rem' : '0.8rem', ...styles }}
    />
  );

  return getLabel(Input, label);
};

function getLabel(children: JSX.Element, label?: string): JSX.Element {
  if (!label) return children;

  return (
    <StyledLabel>
      {label}
      {children}
    </StyledLabel>
  );
}
