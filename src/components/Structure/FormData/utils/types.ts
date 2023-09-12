import { Mode, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';
import { IStandardInput } from '../Input/utils/types';
import { CSSProperties } from 'react';

export type ISubmitForm = (
  data: any,
  formContext: UseFormReturn<any>
) => void | Promise<void>;

export interface IFormData {
  inputs: IStandardInput[];
  validationSchema: ZodType;
  alignment?: 'start' | 'center' | 'end';
  onSubmit: ISubmitForm;
  submitButtonText: string;
  styles?: CSSProperties;
  mode?: Mode;
}
