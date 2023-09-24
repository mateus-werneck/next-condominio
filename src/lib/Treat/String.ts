export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function isValidUUID(value: string): boolean {
  return (
    value.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    ) !== null
  );
}
