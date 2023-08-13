interface IFilter {
  [key: string]: string;
}

export function appendQueryParams<T extends object>(
  route: string,
  params: T
): string {
  const url = new URL(route);
  const filters = params as IFilter;

  Object.keys(params).forEach((name: string) =>
    url.searchParams.append(name, filters[name])
  );

  return url.toString();
}
