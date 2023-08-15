export class ObjectUtil {
  public static sort<T extends IObject>(
    collection: T[],
    propName: string
  ): T[] {
    return collection.sort((a, b) => {
      if (a[propName] < b[propName]) {
        return -1;
      }

      if (a[propName] > b[propName]) {
        return 1;
      }

      return 0;
    });
  }

  public static empty<T extends IObject>(value: T) {
    const values = Object.values(value);
    return (
      Object.keys(value).length == 0 ||
      values.filter((element) => element !== undefined).length == 0
    );
  }
}

type IObject = {
  [key: string]: any;
};
