import { IButton } from './types';

export default function Button(props: IButton) {
  const className = props.className ?? '';

  return (
    <button
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onDragOver={props.onDragOver}
      onDragLeave={props.onDragLeave}
      onDrop={props.onDrop}
      className={`${className} flex gap-1 text-lg md:text-sm rounded-md hover:transition-all ease-in-out duration-500`}
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
