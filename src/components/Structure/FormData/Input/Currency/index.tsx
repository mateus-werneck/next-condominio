import { MoneyUtil } from '@Lib/Treat/Money';
import { useEffect, useRef, useState } from 'react';
import { IStandardCurrency } from './types';

export default function StandardCurrencyInput({
  register,
  initialValue,
  ...props
}: IStandardCurrency) {
  const [amount, setAmount] = useState<number>();
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (!ref.current) return;
    const numbers = ref.current.value.replace(/\D/g, '');
    const amount = Number(numbers) / 100;
    setAmount(amount);

    ref.current.value = amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  useEffect(() => handleChange(), [amount]);

  return (
    <input
      {...register(props.name)}
      className={props.className}
      style={props.style}
      readOnly={props.readOnly}
      placeholder={props.placeholder}
      value={ref.current?.value ?? MoneyUtil.toBRL(initialValue ?? 0)}
      onChange={handleChange}
      ref={ref}
      autoFocus
    />
  );
}
