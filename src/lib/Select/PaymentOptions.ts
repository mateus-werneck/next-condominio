export const paymentTypes = [
  { id: '1', label: 'À Vista' },
  { id: '2', label: 'Parcelado' }
];

export function getPaymentTypeId(label: string) {
  return paymentTypes.find((p) => p.label === label)?.id;
}

export function getPaymentType(id: string) {
  return paymentTypes.find((p) => p.id === id)?.label;
}
