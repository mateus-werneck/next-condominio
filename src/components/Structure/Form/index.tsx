import {
  FieldErrors,
  UseFormRegister,
  UseFormReturn,
  useForm
} from 'react-hook-form';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DefaultButton from '../Button';
import { IStandardInput, StandardInput } from './Input';
import { StyledValidationAlert } from './Input/style';
import { FormInputContainer, StyledForm } from './style';

interface IStandardForm {
  inputs: StandardInput[];
  validationSchema: ZodType;
  onSubmit: (
    data: any,
    formContext: UseFormReturn<any>
  ) => void | Promise<void>;
  submitButtonText?: string;
}

export type StandardInput = Omit<IStandardInput, 'register' | 'hasErrors'>;

export const StandardForm = ({
  inputs,
  validationSchema,
  onSubmit,
  submitButtonText
}: IStandardForm) => {
  type FormDataType = z.infer<typeof validationSchema>;

  const formContext = useForm<FormDataType>({
    resolver: zodResolver(validationSchema)
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = formContext;

  function onSubmitFunction(data: any) {
    onSubmit(data, formContext);
  }

  return (
    <div className="flex flex-col justify-center items-center self-center rounded-md bg-slate-100 p-4 mt-4">
      <StyledForm onSubmit={handleSubmit(onSubmitFunction)}>
        {getFormInputs(inputs, register, errors)}
      </StyledForm>
      {submitButtonText && (
        <div className="max-w-fit self-end">
          <DefaultButton
            type="submit"
            color="success"
            onClickFunction={handleSubmit(onSubmitFunction)}
            disable={isSubmitting}
          >
            {submitButtonText}
          </DefaultButton>
        </div>
      )}
    </div>
  );
};

function getFormInputs(
  inputs: StandardInput[],
  register: UseFormRegister<any>,
  errors: FieldErrors<any>
): JSX.Element[] {
  return inputs.map((formInput) => (
    <FormInputContainer key={formInput.name + '-div'}>
      <StandardInput
        {...formInput}
        register={register}
        key={formInput.name}
        hasErrors={errors[formInput.name] ? true : false}
      />
      {errors[formInput.name] && (
        <StyledValidationAlert key={formInput.name + '-warning'}>
          {String(errors[formInput.name]?.message)}
        </StyledValidationAlert>
      )}
    </FormInputContainer>
  ));
}
