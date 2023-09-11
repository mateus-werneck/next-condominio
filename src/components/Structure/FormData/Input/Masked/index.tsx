import Masks from '@Lib/Masks/Masks';
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
      render={({ field: { ref, ..._field } }) => (
        <ReactInputMask
          {...getInputProps(props)}
          {..._field}
          mask={mask}
          maskChar={props.maskChar ?? ''}
          autoFocus
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
      render={({ field: { onChange, value, ..._field } }) => (
        <CurrencyInput
          {...getInputProps(props)}
          {..._field}
          disableGroupSeparators
          disableAbbreviations
          value={value}
          onValueChange={onChange}
          allowNegativeValue={true}
          intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
          placeholder="R$ 0,00"
          onBlur={() => {
            const money = value.split(',');
            if (money.length == 1 || (money.length > 1 && !money[1].length)) {
              onChange(value.replace(',', '') + ',00');
            }
          }}
        />
      )}
    />
  );
}