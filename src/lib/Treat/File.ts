export function getExtension(file: File): string {
  const extension = file.name.split('.').pop();
  return String(extension);
}

export function hasValidExtension(
  file: File,
  validExtensions: string[]
): boolean {
  const extension = '.' + getExtension(file);
  return validExtensions.includes(extension);
}

export function getDisplayName(file: File): string {
  const extension = getExtension(file);

  if (file.name.length <= 20) return file.name;

  return file.name.slice(0, 20) + '...' + extension;
}

export function getFileSizeMb(file: File): number {
  return file.size / Math.pow(10, 6);
}

export function hasValidSize(file: File, maxSize?: number): boolean {
  return maxSize === undefined || getFileSizeMb(file) <= maxSize;
}

export function hasExcelExtension(file: File): boolean {
  return hasValidExtension(file, ['.xlsx', '.xls', '.csv', '.odt']);
}
