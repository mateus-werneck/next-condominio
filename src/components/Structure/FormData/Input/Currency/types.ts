import { FieldValues, UseFormRegister } from 'react-hook-form';
import { IDefaultFormInputProps } from '../../types';

export interface IStandardCurrency
  extends Omit<IDefaultFormInputProps, 'options' | 'multiSelect'> {
  register: UseFormRegister<FieldValues>;
}
