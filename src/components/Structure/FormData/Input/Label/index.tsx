interface ILabel {
  children: JSX.Element;
  label?: string;
}
export default function Label({ children, label }: ILabel) {
  if (!label) return children;

  return (
    <label className="flex flex-col gap-1 text-xs to-gray-300">
      {label}
      {children}
    </label>
  );
}
