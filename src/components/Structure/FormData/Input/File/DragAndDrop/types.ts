import { IDefaultFormInputProps } from '@Components/Structure/FormData/types';
import { Control, UseFormSetValue } from 'react-hook-form';

export interface IStandardFileInput
  extends Omit<IDefaultFormInputProps, 'options' | 'multiselect' | 'accept'> {
  accept: string;
  control: Control<any, any>;
  setValue: UseFormSetValue<any>;
}
