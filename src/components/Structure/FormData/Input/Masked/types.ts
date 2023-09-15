import { IMasks } from '@Lib/Masks/types';
import { Control } from 'react-hook-form';
import { IDefaultFormInputProps } from '../../types';

export interface IStandardMasked
  extends Omit<
    IDefaultFormInputProps,
    'type' | 'options' | 'multiselect' | 'mask'
  > {
  mask: IMasks;
  control: Control<any, any>;
}
