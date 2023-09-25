export const paymentTypes = [
  { id: '1', label: 'À Vista' },
  { id: '2', label: 'Parcelado' }
];

export function getPaymentType(label: string) {
  return paymentTypes.find((p) => p.label === label)?.id;
}
