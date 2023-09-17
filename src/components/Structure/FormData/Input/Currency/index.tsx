import { MoneyUtil } from '@Lib/Treat/Money';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { IStandardCurrency } from './types';

export default function StandardCurrencyInput({
  control,
  initialValue,
  ...props
}: IStandardCurrency) {
  const [amount, setAmount] = useState<number>();
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (!ref.current) return;
    const amount = MoneyUtil.toFloat(ref.current.value);
    setAmount(amount);

    const value = amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    ref.current.value = value;
  };

  useEffect(() => handleChange(), [amount]);

  return (
    <Controller
      name={props.name}
      control={control}
      defaultValue={MoneyUtil.toBRL(initialValue ?? 0)}
      rules={{ required: props.required ?? false }}
      render={({ field }) => (
        <input
          {...field}
          className={props.className}
          style={props.style}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange();
            field.onChange(e);
          }}
          ref={ref}
        />
      )}
    />
  );
}
