import { IColors } from '@Lib/Treat/Colors';
import { CSSProperties } from 'react';

export interface IButton {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'text' | 'contained' | 'outlined';
  color?: IColors;
  route?: string;
  disable?: boolean;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
  onClickFunction?: () => void;
}
