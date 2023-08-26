export class MoneyUtil {
  public static formatter(): Intl.NumberFormat {
    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  public static toBRL(value: number): string {
    return MoneyUtil.formatter().format(value);
  }

  public static toFloat(value: string): number {
    const money = value.replace('R$ ', '').replace(',', '.');
    return Number(money);
  }
}
