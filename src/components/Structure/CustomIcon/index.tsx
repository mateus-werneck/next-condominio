import Image from 'next/image';

type ICustomIcon = {
  alt: string;
  src: string;
};

export default function CustomIcon(props: ICustomIcon) {
  return (
    <>
      <Image alt={props.alt} src={props.src} />
    </>
  );
}
