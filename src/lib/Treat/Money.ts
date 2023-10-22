export class MoneyUtil {
  public static formatter(): Intl.NumberFormat {
    return new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  public static toBRL(value: number | string): string {
    if (typeof value === 'string') value = MoneyUtil.toFloat(value);
    return MoneyUtil.formatter().format(value);
  }

  public static toFloat(value: string): number {
    const numbers = value.replace(/\D/g, '');
    const money = (parseFloat(numbers) / 100).toFixed(2);
    return Number(money);
  }
}
