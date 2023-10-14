export const LocalIcons = {
  CSV: 'csv-icon.png',
  JPG: 'jpg-icon.png',
  JPEG: 'jpeg-icon.png',
  JSON: 'json-icon.png',
  ODT: 'odt-icon.png',
  PDF: 'pdf-icon.png',
  PNG: 'png-icon.png',
  XLSX: 'xlsx-icon.png',
  XLS: 'xls-icon.png',
  ZIP: 'zip-icon.png'
};

export type LocalIcon = keyof typeof LocalIcons;

export function isLocalIcon(value: any): boolean {
  return Object.keys(LocalIcons).includes(value);
}
