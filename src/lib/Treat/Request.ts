export interface IFilter {
  [key: string]: string;
}

export function appendQueryParams<T extends IFilter>(
  route: string,
  params: T
): string {
  const url = new URL(route);

  Object.keys(params).forEach((name: string) =>
    url.searchParams.append(name, params[name])
  );

  return url.toString();
}
