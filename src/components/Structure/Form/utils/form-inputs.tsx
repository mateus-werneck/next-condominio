import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import StandardMaskedInput from '../Input/Masked';
import StandardSelect from '../Input/Select';
import StandardInput from '../Input/Standard';
import {
  IStandardInput,
  IStandardMasked,
  IStandardSelect
} from '../Input/utils/types';

export function getStandardInput(
  formInput: IStandardInput,
  register: UseFormRegister<any>,
  control: Control<any, any>,
  errors: FieldErrors<any>
) {
  return (
    <div className="flex flex-col" key={formInput.name + '-div'}>
      <StandardInput
        {...formInput}
        register={register}
        control={control}
        key={formInput.name}
        hasErrors={errors[formInput.name] ? true : false}
      />
      {errors[formInput.name] && getErrorMessage(formInput, errors)}
    </div>
  );
}

export function getSelectInput(
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

export function getMaskedInput(
  formInput: IStandardMasked,
  control: Control<any, any>,
  errors: FieldErrors<any>
) {
  return (
    <div className="flex flex-col" key={formInput.name + '-div'}>
      <StandardMaskedInput
        {...formInput}
        control={control}
        key={formInput.name}
      />
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
