import Image from 'next/image';
import { LocalIcon, LocalIcons, isLocalIcon } from './types';

type ICustomIcon = {
  src: LocalIcon | string;
  alt: string;
  width?: number;
  height?: number;
};

export default function CustomIcon(props: ICustomIcon) {
  if (!isLocalIcon(props.src)) return <></>;

  const src = `/images/icons/${LocalIcons[props.src as LocalIcon]}`;

  return (
    <>
      <Image
        alt={props.alt}
        src={src}
        width={props.width ?? 32}
        height={props.height ?? 32}
      />
    </>
  );
}
