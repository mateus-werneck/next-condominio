import { Masks } from '@Lib/Input/masks';
import CurrencyInput from 'react-currency-input-field';
import { Controller } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import { getInputProps, getLabel } from '../utils/input-props';
import { IStandardMasked } from '../utils/types';

export default function StandardMaskedInput(props: IStandardMasked) {
  const maskedInput =
    props.mask == Masks.BRL ? getCurrencyInput(props) : getInputMask(props);
  return getLabel(maskedInput, props.label);
}

function getInputMask(props: IStandardMasked): JSX.Element {
  const mask = props.mask == undefined ? '' : props.mask;
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.initialValue ?? ''}
      rules={{ required: props.required ?? false }}
      render={({ field: { value, onChange, ..._field } }) => (
        <ReactInputMask
          mask={mask}
          maskChar={props.maskChar ?? ''}
          alwaysShowMask={false}
          value={value}
          onChange={onChange}
          {...getInputProps(props)}
          {..._field}
        />
      )}
    />
  );
}

function getCurrencyInput(props: IStandardMasked): JSX.Element {
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.initialValue ?? ''}
      rules={{ required: props.required ?? false }}
      render={({ field: { onChange, ..._field } }) => (
        <CurrencyInput
          decimalSeparator=","
          groupSeparator="."
          decimalsLimit={2}
          onValueChange={onChange}
          allowNegativeValue={true}
          prefix="R$ "
          {...getInputProps(props)}
          {..._field}
          placeholder="R$ 0,00"
        />
      )}
    />
  );
}
