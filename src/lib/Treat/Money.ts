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
    const money = value.replace(/[^0-9]/g, '');
    return Number(money) / 100;
  }
}
