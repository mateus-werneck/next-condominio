import { CSSProperties } from 'react';
import { Control, FieldValues, UseFormRegister } from 'react-hook-form';
import { ISelectOption } from '../Select/types';
import { Masks } from './utils/inputMask';

export interface IFormInput extends IStandardInput {
  hasErrors: boolean;
  register: UseFormRegister<FieldValues>;
  control?: Control<any, any>;
}

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
