import { Control } from 'react-hook-form';
import { IDefaultFormInputProps } from '../../types';

export interface ISelectOption {
  id: string | number;
  label: string;
  [key: string]: any;
}

export interface IStandardSelect
  extends Omit<IDefaultFormInputProps, 'register' | 'mask' | 'maskChar'> {
  name: string;
  options: ISelectOption[];
  multiSelect?: boolean;
  control: Control<any, any>;
  multi?: boolean;
  label?: string;
  initialValue?: any;
  hasErrors: boolean;
}
