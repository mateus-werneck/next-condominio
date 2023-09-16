export interface IButton {
  type?: 'button' | 'submit' | 'reset';
  route?: string;
  disable?: boolean;
  className?: string;
  children: React.ReactNode;
  onClickFunction?: () => void;
}
