import { Control, UseFormSetValue } from 'react-hook-form';
import { IDefaultFormInputProps } from '../../types';

export interface IStandardFileInput
  extends Omit<IDefaultFormInputProps, 'options' | 'multiselect' | 'accept'> {
  accept: string;
  control: Control<any, any>;
  setValue: UseFormSetValue<any>;
}
