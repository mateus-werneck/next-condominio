import { DragEventHandler, MouseEvent } from 'react';

export interface IButton {
  type?: 'button' | 'submit' | 'reset';
  route?: string;
  disable?: boolean;
  className?: string;
  children: React.ReactNode;
  onClickFunction?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onDragOver?: DragEventHandler<HTMLButtonElement>;
  onDragLeave?: DragEventHandler<HTMLButtonElement>;
  onDrop?: DragEventHandler<HTMLButtonElement>;
}
