import { useDevice } from '@Contexts/useDevice';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircularProgress } from '@mui/material';
import { UseFormHandleSubmit, UseFormReturn, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import DefaultButton from '../Button';
import { IStandardInput } from './Input/types';
import { getFormInputs } from './Utils/FormInputs';

interface IStandardForm {
  inputs: IStandardInput[];
  validationSchema: ZodType;
  onSubmit: (
    data: any,
    formContext: UseFormReturn<any>
  ) => void | Promise<void>;
  submitButtonText?: string;
  align?: 'self-center' | 'self-start' | 'self-end';
}

export const StandardForm = ({
  inputs,
  validationSchema,
  onSubmit,
  submitButtonText,
  align
}: IStandardForm) => {
  type FormDataType = z.infer<typeof validationSchema>;
  const { isMobileView } = useDevice();

  const formContext = useForm<FormDataType>({
    resolver: zodResolver(validationSchema)
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = formContext;

  function onSubmitFunction(data: any) {
    return new Promise<void>((resolve) => {
      resolve(onSubmit(data, formContext));
    });
  }

  return (
    <div className="flex flex-col justify-center items-center rounded-md bg-slate-100 p-4 mt-4 gap-4">
      <form
        className="flex flex-col mt-4 gap-4 md:grid md:grid-cols-3 min-w-[256px]"
        onSubmit={handleSubmit(onSubmitFunction)}
      >
        {getFormInputs(inputs, register, control, errors)}
      </form>
      {submitButtonText &&
        getSubmitButton(
          submitButtonText,
          handleSubmit,
          onSubmitFunction,
          isSubmitting
        )}
    </div>
  );
};

function getSubmitButton(
  submitButtonText: string,
  handleSubmit: UseFormHandleSubmit<any>,
  onSubmitFunction: (data: any) => void,
  isSubmitting: boolean
): JSX.Element {
  return (
    <div className="max-w-fit self-end">
      <DefaultButton
        type="submit"
        color="success"
        onClickFunction={handleSubmit(onSubmitFunction)}
        disable={isSubmitting}
      >
        {!isSubmitting ? (
          submitButtonText
        ) : (
          <CircularProgress color="inherit" size={16} />
        )}
      </DefaultButton>
    </div>
  );
}
