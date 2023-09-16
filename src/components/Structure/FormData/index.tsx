import { zodResolver } from '@hookform/resolvers/zod';
import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../Button';
import { IFormData } from './types';
import { getFormInputs } from './utils/form-inputs';

export default function FormData(props: IFormData) {
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

  return (
    <div
      className={
        `flex flex-col justify-center items-center hd:items-${alignment} self-center hd:self-${alignment}` +
        ' max-w-fit bg-slate-100 p-4 mt-4 mb-4 gap-8'
      }
      style={props.styles}
    >
      <form
        className="flex flex-col mt-4 gap-4 lg:grid lg:grid-cols-2 min-w-[256px]"
        onSubmit={handleSubmit(onSubmitFunction)}
      >
        {getFormInputs({ inputs: props.inputs, register, control, errors })}
      </form>
      <div className="max-w-fit self-end">
        <Button
          type="submit"
          disable={isSubmitting}
          className="bg-black text-white px-4 py-1 hover:bg-gray-500 hover:text-black hover:font-bold"
        >
          {!isSubmitting ? (
            props.submitButtonText
          ) : (
            <CircularProgress color="info" size={16} />
          )}
        </Button>
      </div>
    </div>
  );
}
