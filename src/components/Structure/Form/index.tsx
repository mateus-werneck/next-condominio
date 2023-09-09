import { zodResolver } from '@hookform/resolvers/zod';
import { CircularProgress } from '@mui/material';
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm
} from 'react-hook-form';
import { z } from 'zod';
import DefaultButton from '../Button';
import {
  IStandardInput,
  IStandardMasked,
  IStandardSelect
} from './Input/utils/types';
import {
  getMaskedInput,
  getSelectInput,
  getStandardInput
} from './utils/form-inputs';
import { IStandardForm } from './utils/types';

export default function StandardForm(props: IStandardForm) {
  type FormDataType = z.infer<typeof props.validationSchema>;

  const formContext = useForm<FormDataType>({
    resolver: zodResolver(props.validationSchema),
    mode: props.mode ?? 'onChange'
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = formContext;

  function onSubmitFunction(data: any) {
    return new Promise<void>((resolve) => {
      resolve(props.onSubmit(data, formContext));
    });
  }

  const alignment = props.alignment ?? 'start';

  const containerStyle = `flex flex-col justify-center items-${alignment} self-${alignment} max-w-fit rounded-md bg-slate-100 p-4 mt-4 gap-8`;

  return (
    <div className={containerStyle}>
      <form
        className="flex flex-col mt-4 gap-4 lg:grid lg:grid-cols-2 min-w-[256px]"
        onSubmit={handleSubmit(onSubmitFunction, onSubmitFunction)}
      >
        {getFormInputs(props.inputs, register, control, errors)}
      </form>
      {props.submitButtonText &&
        getSubmitButton(
          props.submitButtonText,
          handleSubmit,
          onSubmitFunction,
          isSubmitting
        )}
    </div>
  );
}

function getFormInputs(
  inputs: IStandardInput[],
  register: UseFormRegister<any>,
  control: Control<any, any>,
  errors: FieldErrors<any>
): JSX.Element[] {
  return inputs.map((formInput) => {
    if (formInput.type == 'select')
      return getSelectInput(formInput as IStandardSelect, control, errors);

    if (formInput.mask)
      return getMaskedInput(formInput as IStandardMasked, control, errors);

    return getStandardInput(formInput, register, control, errors);
  });
}

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
        color="secondary"
        onClickFunction={handleSubmit(onSubmitFunction)}
        disable={isSubmitting}
      >
        {!isSubmitting ? (
          submitButtonText
        ) : (
          <CircularProgress color="info" size={16} />
        )}
      </DefaultButton>
    </div>
  );
}
