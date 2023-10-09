import { DragEventHandler } from 'react';

export interface IButton {
  type?: 'button' | 'submit' | 'reset';
  route?: string;
  disable?: boolean;
  className?: string;
  children: React.ReactNode;
  onClickFunction?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onDragOver?: DragEventHandler<HTMLButtonElement>;
  onDragLeave?: DragEventHandler<HTMLButtonElement>;
  onDrop?: DragEventHandler<HTMLButtonElement>;
}
