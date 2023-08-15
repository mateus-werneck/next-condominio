import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { StandardInput } from '../Input';
import { IStandardInput } from '../Input/types';
import { StandardSelect } from '../Select';
import { IStandardSelect } from '../Select/types';

export function getFormInputs(
  inputs: IStandardInput[],
  register: UseFormRegister<any>,
  control: Control<any, any>,
  errors: FieldErrors<any>
): JSX.Element[] {
  return inputs.map((formInput) =>
    getEachFormInput(formInput, register, control, errors)
  );
}

function getEachFormInput(
  formInput: IStandardInput,
  register: UseFormRegister<any>,
  control: Control<any, any>,
  errors: FieldErrors<any>
) {
  if (isSelectInput(formInput.type)) {
    return getSelectInput(formInput as IStandardSelect, control, errors);
  }
  return getStandardInput(formInput, register, errors);
}

function isSelectInput(inputType?: string) {
  return inputType === 'select';
}

function getStandardInput(
  formInput: IStandardInput,
  register: UseFormRegister<any>,
  errors: FieldErrors<any>
) {
  return (
    <div className="flex flex-col" key={formInput.name + '-div'}>
      <StandardInput
        {...formInput}
        register={register}
        key={formInput.name}
        hasErrors={errors[formInput.name] ? true : false}
      />
      {errors[formInput.name] && getErrorMessage(formInput, errors)}
    </div>
  );
}

function getSelectInput(
  formInput: IStandardSelect,
  control: Control<any, any>,
  errors: FieldErrors<any>
) {
  return (
    <div className="flex flex-col" key={formInput.name + '-div'}>
      <StandardSelect {...formInput} control={control} key={formInput.name} />
      {errors[formInput.name] && getErrorMessage(formInput, errors)}
    </div>
  );
}

function getErrorMessage<T extends IStandardInput>(
  formInput: T,
  errors: FieldErrors<any>
): JSX.Element {
  return (
    <span
      className="indent-2 text-xs text-red-600/100 mb-4"
      key={formInput.name + '-warning'}
    >
      {String(errors[formInput.name]?.message)}
    </span>
  );
}
