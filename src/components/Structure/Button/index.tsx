'use client';

import { Button } from '@mui/material';
import { CSSProperties } from 'react';

interface IDefaultButton {
  onClickFunction?: () => void;
  variant?: 'text' | 'contained' | 'outlined';
  color?:
    | 'success'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'warning';
  type?: 'button' | 'submit' | 'reset';
  route?: string;
  disable?: boolean;
  styles?: CSSProperties;
  children: React.ReactNode;
}

export default function DefaultButton({
  onClickFunction,
  variant,
  color,
  type,
  route,
  disable,
  styles,
  children
}: IDefaultButton) {
  const { getCustomStyle } = useColor(color, styles);
  const customVariant = variant ? variant : 'contained';
  const disabled = disable !== undefined ? disable : false;
  const buttonType = type !== undefined ? type : 'button';

  return (
    <Button
      className="flex gap-1 hover:brightness-95 transition-all duration-300 text-xs h-6 md:h-full"
      disabled={disabled}
      type={buttonType}
      variant={customVariant}
      href={route}
      onClick={onClickFunction}
      style={getCustomStyle()}
    >
      {children}
    </Button>
  );
}

function useColor(color?: string, styles?: CSSProperties) {
  function getCustomStyle() {
    const customStyle = styles ? styles : {};

    if (color === undefined) return customStyle;

    return {
      ...customStyle,
      background: getColor()
    };
  }
  function getColor() {
    const primary = 'var(--blue)';

    if (color === 'success') return 'var(--green)';
    if (color === 'primary') return primary;
    if (color === 'secondary') return 'black';
    if (color === 'error') return 'var(--red)';
    if (color === 'info') return 'var(--blue)';
    if (color === 'warning') return 'var(--yellow)';

    return primary;
  }

  return { getCustomStyle };
}
