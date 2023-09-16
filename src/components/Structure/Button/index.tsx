import { CSSProperties, useCallback } from 'react';
import { IButton } from './types';

export default function Button(props: IButton) {
  /*eslint-disable react-hooks/exhaustive-deps*/
  const getStyle = useCallback(() => {
    const { color, variant, style } = props;

    let background: string = color ?? 'black';
    let fontColor = 'white';

    if (variant && variant !== 'contained') {
      background = 'transperent';
      fontColor = 'black';
    }

    const outline = variant === 'outlined' ? 'solid 1px' : 'none';

    const styles = style ?? {};

    return {
      ...styles,
      background: `var(--${background})`,
      color: `var(--${fontColor})`,
      outline,
      outlineColor: `var(--${color ?? 'black'})`
    } as CSSProperties;
  }, [props.color, props.variant]);

  return (
    <button
      className={`flex gap-1 px-4 py-1 text-small rounded-md hover:brightness-100 transition-all duration-300 ${
        props.className ?? ''
      }`}
      style={getStyle()}
      disabled={props.disable ?? false}
      type={props.type ?? 'button'}
      onClick={props.onClickFunction}
    >
      {!props.route ? (
        props.children
      ) : (
        <a href={props.route}>{props.children}</a>
      )}
    </button>
  );
}
