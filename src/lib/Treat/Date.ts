export class DateUtil {
  public static GMTOffset(value: string): Date {
    const date = new Date(value);
    const offset = 24 * 60 * 60 * 1000;
    return new Date(date.getTime() + offset);
  }

  public static BRTOffset(value: string): Date {
    const date = new Date(value);
    const offset = 24 * 60 * 60 * 1000;
    return new Date(date.getTime() - offset);
  }

  public static toLocalePtBr(value: string): string {
    return new Date(value).toLocaleDateString('pt-br', {
      timeZone: 'UTC'
    });
  }

  public static fromDateToIsoString(value: Date): string {
    const isoDate = value.toISOString();
    const [date] = isoDate.split('T');
    return date as string;
  }

  public static fromDateToPtBrString(value: Date): string {
    const utcDate = value.toISOString();
    return this.toLocalePtBr(utcDate);
  }

  public static fromPtBrStringToDate(value: string): Date {
    const isoDate = value.split('/').reverse().join('-');
    return new Date(isoDate);
  }

  public static fromPtBrStringToIsoString(value: string): string {
    const date = new Date(value);
    return this.fromDateToIsoString(date);
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
