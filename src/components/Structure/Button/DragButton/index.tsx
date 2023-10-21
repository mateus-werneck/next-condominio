import { DragEvent, MouseEvent, useEffect, useState } from 'react';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Button from '..';

type TDragButton = {
  DragIcon?: JSX.Element;
  onClickFunction: (e: MouseEvent<HTMLButtonElement>) => void;
  handleDrop: (event: DragEvent<HTMLButtonElement>) => void;
  isDisabled: boolean;
};

export default function DragButton(props: TDragButton) {
  const [isDropping, setIsDropping] = useState<boolean>(false);

  const DragIcon = props.DragIcon ?? (
    <FileOpenIcon
      sx={{ '&:hover': { color: 'inherit' } }}
      style={{
        width: 80,
        height: 80
      }}
    />
  );

  useEffect(() => {
    setIsDropping(props.isDisabled);
  }, [props.isDisabled]);

  return (
    <Button
      className={`w-[240px] md:w-[320px] outline-dashed outline-offset-2 outline-slate-500 self-center items-center justify-center p-4 ${
        isDropping
          ? 'bg-gradient-to-r from-slate-700 to-slate-500 text-white'
          : 'bg-slate-200 text-[var(--gray-light)]'
      } hover:text-white hover:shadow-button hover:translate -translate-x-1 hover:bg-gradient-to-r from-slate-700 to-slate-500`}
      onClickFunction={props.onClickFunction}
      disable={props.isDisabled}
      onDragOver={(e: DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropping(true);
      }}
      onDragLeave={(e: DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropping(false);
      }}
      onDrop={(event: DragEvent<HTMLButtonElement>) => {
        !props.isDisabled && props.handleDrop(event);
      }}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        {DragIcon}
        <span className={`${props.isDisabled ? 'hidden' : 'visible'}`}>
          Arraste um arquivo
        </span>
        <span className={`${props.isDisabled ? 'hidden' : 'visible'}`}>
          Ou clique aqui
        </span>
      </div>
    </Button>
  );
}
