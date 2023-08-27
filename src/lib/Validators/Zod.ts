import { DateUtil } from '@Lib/Treat/Date';
import { MoneyUtil } from '@Lib/Treat/Money';
import { z } from 'zod';

export class ZodValidator {
  /* eslint-disable camelcase */
  public static brl() {
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

  public static ptBrDate() {
    return z
      .string({
        required_error: 'Campo Obrigatório',
        invalid_type_error: 'Data informada inválida.'
      })
      .refine(
        (value: string) =>
          DateUtil.fromPtBrStringToDate(value).toString() !== 'Invalid Date',
        'Data informada inválida.'
      )
      .transform(DateUtil.fromPtBrStringToIsoString);
  }

  public static select() {
    return z
      .object(
        {
          id: z.string({ required_error: 'Campo Obrigatório.' }),
          name: z.string({ required_error: 'Campo Obrigatório.' }),
          label: z.string({ required_error: 'Campo Obrigatório.' })
        },
        { invalid_type_error: 'Valor selecionado inválido' }
      )
      .transform(({ id }) => id);
  }

  public static multiSelect() {
    return z
      .array(
        z.object({
          id: z.string({ required_error: 'Campo Obrigatório.' }),
          name: z.string({ required_error: 'Campo Obrigatório.' }),
          label: z.string({ required_error: 'Campo Obrigatório.' })
        }),
        {
          required_error: 'Campo Obrigatório.',
          invalid_type_error: 'Valor selecionado inválido'
        }
      )
      .transform((value) => value.map(({ id }) => id));
  }

  public static string() {
    return z
      .string({ required_error: 'Campo Obrigatório.' })
      .min(5, 'O campo deve conter no mínimo 5 caracteres.');
  }

  public static phone() {
    return z.string().min(15, 'Telefone inválido.');
  }

  public static number() {
    return z
      .string({
        required_error: 'Campo Obrigatário.',
        invalid_type_error: 'Valor informado inválido.'
      })
      .refine((value) => !isNaN(Number(value)), 'Valor informado inválido')
      .transform(Number);
  }
}
