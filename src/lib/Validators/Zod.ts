import { DateUtil } from '@Lib/Treat/Date';
import {
  getExtension,
  getFileSizeMb,
  hasValidExtension,
  hasValidSize
} from '@Lib/Treat/File';
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
          DateUtil.toDateObject(value).toString() !== 'Invalid Date',
        'Data informada inválida.'
      )
      .transform(DateUtil.toISOString);
  }

  public static select() {
    return z
      .object(
        {
          id: z.string(),
          name: z.string().optional(),
          label: z.string()
        },
        {
          invalid_type_error: 'Valor selecionado inválido',
          required_error: 'Campo Obrigatário.'
        }
      )
      .transform(({ id }) => id);
  }

  public static multiSelect() {
    return z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          label: z.string()
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
    return z
      .union([z.string().min(15, 'Telefone inválido'), z.string().length(0)])
      .optional()
      .transform((e) => (e === '' ? undefined : e));
  }

  public static email() {
    return z
      .union([z.string().email('Email inválido'), z.string().length(0)])
      .optional()
      .transform((e) => (e === '' ? undefined : e));
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

  public static file(validExtensions: string[], maxSize?: number) {
    return z
      .instanceof(File, { message: 'Arquivo enviado inválido.' })
      .refine((value: any) => hasValidExtension(value, validExtensions), {
        message:
          'Extensão de arquivo inválida.' +
          '|Extensões permitidas: ' +
          validExtensions.join(', ')
      })
      .refine((value: any) => hasValidSize(value, maxSize), {
        message:
          'Tamanho do arquivo excede o permitido.' +
          '|Tamanho máximo esperado: ' +
          maxSize +
          ' MB'
      });
  }
}
