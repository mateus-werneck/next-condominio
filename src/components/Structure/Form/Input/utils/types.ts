import { Masks } from '@Lib/Input/masks';
import { CSSProperties } from 'react';
import { Control, FieldValues, UseFormRegister } from 'react-hook-form';

export type IStandardInput = {
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
    | 'tel'
    | 'select';
  mask?: Masks;
  maskChar?: string;
  initialValue?: any;
  styles?: CSSProperties;
  readOnly?: boolean;
  required?: boolean;
  options?: ISelectOption[];
  multiSelect?: boolean;
};

export interface IFormInput extends IStandardInput {
  hasErrors: boolean;
  register: UseFormRegister<FieldValues>;
  control: Control<any, any>;
}

export interface ISelectOption {
  id: string | number;
  label: string;
  [key: string]: any;
}

export interface IStandardSelect
  extends Omit<IFormInput, 'register' | 'mask' | 'maskChar'> {
  name: string;
  options: ISelectOption[];
  multiSelect?: boolean;
  control: Control<any, any>;
  multi?: boolean;
  label?: string;
  initialValue?: any;
  readOnly?: boolean;
  required?: boolean;
}

export interface IStandardMasked
  extends Omit<IFormInput, 'type' | 'options' | 'multiselect' | 'mask'> {
  mask: Masks;
}
