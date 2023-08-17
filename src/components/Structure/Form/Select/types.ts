import { Control } from 'react-hook-form';

export interface ISelectOption {
  id: string | number;
  label: string;
  [key: string]: any;
}

export interface IStandardSelect {
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
