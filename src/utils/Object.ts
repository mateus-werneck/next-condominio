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
}

type IObject = {
  [key: string]: any;
};
