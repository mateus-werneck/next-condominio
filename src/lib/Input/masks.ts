export const Masks = {
  APARTMENT: '999',
  BRL: 'BRL',
  DATE: '99/99/9999',
  DATETIME: '99/99/9999 99:99',
  PHONE: '(99) 99999-9999'
};

type MaskKeys = keyof typeof Masks;
export type IMasks = (typeof Masks)[MaskKeys];
