import { ISelectOption } from '@Components/Structure/Form/Input';
import { Control } from 'react-hook-form';

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
  initialValue?: any;
  styles?: CSSProperties;
  readOnly?: boolean;
  required?: boolean;
  options?: ISelectOption[];
  multiSelect?: boolean;
};
