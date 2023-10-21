import { IMasks } from '@Lib/Masks/types';
import { CSSProperties } from 'react';
import { Mode, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';
import { ISelectOption } from './Input/Select/types';

export type ISubmitForm<T> = (
  data: T,
  formContext: UseFormReturn<any>
) => void | Promise<void>;

export interface IFormData<T> {
  inputs: IFormInput[];
  validationSchema: ZodType;
  alignment?: 'start' | 'center' | 'end';
  onSubmit: ISubmitForm<T>;
  submitButtonText: string;
  styles?: CSSProperties;
  zodValidationMode?: Mode;
}

export interface IFormInput {
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
  mask?: IMasks;
  maskChar?: string;
  initialValue?: any;
  styles?: CSSProperties;
  readOnly?: boolean;
  required?: boolean;
  options?: ISelectOption[];
  multiSelect?: boolean;
  accept?: string;
  fileInfo?: any;
}

export interface IDefaultFormInputProps
  extends Omit<IFormInput, 'styles' | 'placeHolder'> {
  className: string;
  placeholder: string;
  readOnly: boolean;
  required: boolean;
  style: CSSProperties;
}
