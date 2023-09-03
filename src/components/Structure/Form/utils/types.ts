import { Mode, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';
import { IStandardInput } from '../Input/utils/types';

export type ISubmitForm = (
  data: any,
  formContext: UseFormReturn<any>
) => void | Promise<void>;

export interface IStandardForm {
  inputs: IStandardInput[];
  validationSchema: ZodType;
  onSubmit: ISubmitForm;
  submitButtonText?: string;
  mode?: Mode;
}
