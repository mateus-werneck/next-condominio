import Masks from '@Lib/Masks/Masks';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import StandardCurrencyInput from '../Input/Currency';
import Error from '../Input/Error';
import Label from '../Input/Label';
import StandardMaskedInput from '../Input/Masked';
import StandardSelect from '../Input/Select';
import { IStandardSelect } from '../Input/Select/types';
import StandardInput from '../Input/Standard';
import { IDefaultFormInputProps, IFormInput } from '../types';

interface IFormInputProps {
  inputs: IFormInput[];
  register: UseFormRegister<any>;
  control: Control<any, any>;
  errors: FieldErrors<any>;
}

export function getFormInputs({
  inputs,
  register,
  control,
  errors
}: IFormInputProps): JSX.Element[] {
  return inputs.map((formInput: IFormInput) => {
    if (formInput.type == 'select') {
      return getSelectInput(formInput, control, errors);
    }

    if (!formInput.mask) {
      return getStandardInput(formInput, register, errors);
    }

    if (formInput.mask && formInput.mask == Masks.BRL) {
      return getCurrencyInput(formInput, control, errors);
    }

    return getMaskedInput(formInput, control, errors);
  });
}

function getStandardInput(
  formInput: IFormInput,
  register: UseFormRegister<any>,
  errors: FieldErrors<any>
) {
  return (
    <Label label={formInput.label} key={formInput.name}>
      <div className="flex flex-col" key={formInput.name + '-div'}>
        <StandardInput
          {...getFormInputProps(formInput)}
          register={register}
          key={formInput.name}
        />
        <Error name={formInput.name} errors={errors} />
      </div>
    </Label>
  );
}

function getSelectInput(
  formInput: IFormInput,
  control: Control<any, any>,
  errors: FieldErrors<any>
) {
  return (
    <div className="flex flex-col" key={formInput.name + '-div'}>
      <StandardSelect
        {...(getFormInputProps(formInput) as IStandardSelect)}
        control={control}
        key={formInput.name}
      />
      <Error name={formInput.name} errors={errors} />
    </div>
  );
}

function getMaskedInput(
  formInput: IFormInput,
  control: Control<any, any>,
  errors: FieldErrors<any>
) {
  return (
    <Label label={formInput.label} key={formInput.name}>
      <div className="flex flex-col" key={formInput.name + '-div'}>
        <StandardMaskedInput
          {...getFormInputProps(formInput)}
          control={control}
          key={formInput.name}
        />
        <Error name={formInput.name} errors={errors} />
      </div>
    </Label>
  );
}

function getCurrencyInput(
  formInput: IFormInput,
  control: Control<any, any>,
  errors: FieldErrors<any>
) {
  return (
    <Label label={formInput.label} key={formInput.name}>
      <div className="flex flex-col" key={formInput.name + '-div'}>
        <StandardCurrencyInput
          {...getFormInputProps(formInput)}
          control={control}
          key={formInput.name}
        />
        <Error name={formInput.name} errors={errors} />
      </div>
    </Label>
  );
}

function getFormInputProps(props: IFormInput): IDefaultFormInputProps {
  return {
    ...props,
    className:
      'w-72 md:w-56 xl:w-96 h-8 text-xs rounded-md outline-none text-black indent-2 hover:border-sky-200 border-transparent border-2 focus:outline-none focus:ring-2 focus:ring-sky-200',
    placeholder: props.placeHolder ?? '',
    readOnly: props.readOnly ?? false,
    required: props.required ?? false,
    style: props.styles ?? {}
  };
}
