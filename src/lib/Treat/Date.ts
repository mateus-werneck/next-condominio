export type MonthRange = {
  startAt: Date;
  endAt: Date;
};

export class DateUtil {
  private static isLocalPtBr(value: any): boolean {
    if (typeof value !== 'string') {
      return false;
    }
    return value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/) !== null;
  }

  private static isISOString(value: any): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    return value.match(/^(\d{4})-(\d{2})-(\d{2})$/) !== null;
  }

  private static isCompleteISOString(value: any): boolean {
    if (typeof value !== 'string') {
      return false;
    }
    return (
      value.match(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/
      ) !== null
    );
  }

  private static fromPtBrStringToDate(value: string): Date {
    const isoDate = value.split('/').reverse().join('-');
    return new Date(isoDate);
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

  public static toLocalePtBr(value: any): string {
    if (!value) return 'Invalid Date';

    if (DateUtil.isLocalPtBr(value)) return value;

    if (typeof value === 'string') {
      value = new Date(value);
    }

    return value.toLocaleDateString('pt-br', {
      timeZone: 'UTC'
    });
  }

  public static toDateObject(value: any): Date {
    if (!value) return new Date();

    if (value instanceof Date) return value;

    if (typeof value === 'string') {
      value = DateUtil.toISOString(value);
    }

    return new Date(value);
  }

  public static toISOString(value: any): string {
    if (!value) return 'Invalid Date';

    if (DateUtil.isISOString(value)) return value;

    if (DateUtil.isCompleteISOString(value)) {
      value = new Date(value);
    }

    if (DateUtil.isLocalPtBr(value)) {
      value = DateUtil.fromPtBrStringToDate(value);
    }

    if (typeof value === 'string') {
      value = new Date(value);
    }

    const isoDate = value.toISOString();

    return isoDate.split('T')[0];
  }

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
}
