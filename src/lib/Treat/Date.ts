export class DateUtil {
  public static toIsoStringDate(value: Date): string {
    const isoDate = value.toISOString();
    return isoDate.split('T').shift() as string;
  }

  public static isoDateFromPtBr(value: string): Date {
    return new Date(value.split('/').reverse().join('-'));
  }

  public static toLocalePtBr(value: string): string {
    return new Date(value).toLocaleDateString('pt-br', { timeZone: 'UTC' });
  }

  public static getMonthRange(month: number | undefined = undefined): {
    startAt: Date;
    endAt: Date;
  } {
    const currentDate = new Date(),
      y = currentDate.getFullYear(),
      m = currentDate.getMonth();

    month = month === undefined ? m : month;

    return {
      startAt: new Date(y, month, 1),
      endAt: new Date(y, month + 1, 0)
    };
  }
}

export type MonthRange = {
  startAt: Date;
  endAt: Date;
};
