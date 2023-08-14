export interface ISelectOption {
  id: string | number;
  label: string;
  [key: string]: any;
}

export interface IStandardSelect {
  name: string;
  options: ISelectOption[];
  control: Control<any, any>;
  label?: string;
  initialValue?: any;
  readOnly?: boolean;
  required?: boolean;
}
