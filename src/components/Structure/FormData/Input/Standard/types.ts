import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IDefaultFormInputProps } from '../../types';

export interface IStandardInput
  extends Omit<
    IDefaultFormInputProps,
    'options' | 'multiSelect' | 'placeHolder'
  > {
  register: UseFormRegister<FieldValues>;
}
