import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SubmitButton from './SubmitButton';
import { IFormData } from './types';
import { getFormInputs } from './utils/form-inputs';

export default function FormData<T>(props: IFormData<T>) {
  type FormDataType = z.infer<typeof props.validationSchema>;

  const formContext = useForm<FormDataType>({
    resolver: zodResolver(props.validationSchema),
    mode: props.zodValidationMode ?? 'onChange'
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isValid }
  } = formContext;

  function onSubmitFunction(data: T) {
    return new Promise<void>((resolve) => {
      resolve(props.onSubmit(data, formContext));
    });
  }

  const alignment = props.alignment ?? 'start';

  return (
    <div
      className={
        `flex flex-col md:items-${alignment} md:self-${alignment}` +
        ' max-w-full bg-slate-100 p-4 mt-4 mb-4 gap-8 rounded-lg'
      }
    >
      <form
        className="flex flex-col mt-4 gap-4 lg:grid lg:grid-cols-2 min-w-[256px]"
        style={props.styles}
        onSubmit={handleSubmit(onSubmitFunction)}
      >
        {getFormInputs({
          inputs: props.inputs,
          register,
          control,
          setValue,
          errors
        })}
        <div className="p-8 min-w-full col-span-2" />
        <div className="min-w-full col-span-2">
          <SubmitButton
            isBlocked={!isValid}
            isSubmitting={isSubmitting}
            label={props.submitButtonText}
          />
        </div>
      </form>
    </div>
  );
}
