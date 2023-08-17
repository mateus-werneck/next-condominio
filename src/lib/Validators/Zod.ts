import { MoneyUtil } from '@Lib/Treat/Money';
import { z } from 'zod';

export class ZodValidator {
  /* eslint-disable camelcase */
  public static currency() {
    return z
      .string({ required_error: 'Valor informado inválido' })
      .refine((value) => {
        const currencyValue = MoneyUtil.toFloat(value);
        return !isNaN(currencyValue) && currencyValue >= 1;
      }, 'O Valor informado deve maior que 0.')
      .transform(MoneyUtil.toFloat);
  }

  public static date() {
    return z
      .string({
        required_error: 'Campo Obrigatório',
        invalid_type_error: 'Data informada inválida.'
      })
      .refine(
        (value: string) => new Date(value).toString() !== 'Invalid Date',
        'Data informada inválida.'
      );
  }
}
