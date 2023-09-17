import { Control } from 'react-hook-form';
import { IDefaultFormInputProps } from '../../types';

export interface IStandardCurrency
  extends Omit<IDefaultFormInputProps, 'options' | 'multiSelect'> {
  control: Control<any, any>;
}
