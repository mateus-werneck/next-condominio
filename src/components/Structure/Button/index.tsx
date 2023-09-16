import { IButton } from './types';

export default function Button(props: IButton) {
  const className = props.className ?? '';

  return (
    <button
      className={`${className} flex gap-1 text-small md:text-sm rounded-md hover:transition-all duration-500 delay-100`}
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
