import Button from '@Components/Structure/Button';
import CustomIcon from '@Components/Structure/CustomIcon';
import { LocalIcon } from '@Components/Structure/CustomIcon/types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getDisplayName, getExtension, getFileSizeMb } from '@Lib/Treat/File';
import { MouseEvent } from 'react';

type TShowFiles = {
  file: File | null;
  removeFile: () => void;
};

export default function ShowFiles({ file, removeFile }: TShowFiles) {
  if (file === null) return <></>;

  return (
    <div
      className={`${
        file !== null ? 'visible' : 'invisible'
      } flex flex-col w-full p-4 text-slate-700 items-center justify-between gap-2`}
    >
      <Button
        className="flex flex-col items-center justify-center p-4 text-sm md:text-md bg-slate-200 rounded-md gap-4 hover:bg-slate-500"
        onClickFunction={(e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();

          if (file === null) return;

          const ancor = document.createElement('a');

          ancor.target = '_blank';
          ancor.download = file.name;
          ancor.href = URL.createObjectURL(file);

          ancor.click();
        }}
      >
        <p className="flex flex-row gap-2 items-center justify-center">
          {file ? (
            <CustomIcon
              alt="Uploaded File Extension Icon"
              src={getExtension(file).toUpperCase() as LocalIcon}
              width={40}
              height={40}
            />
          ) : (
            <></>
          )}
          <span className="text-sm text-black break-all">
            {file ? getDisplayName(file) : ''}
          </span>
        </p>
        <span className="font-bold">
          {' '}
          {file ? getFileSizeMb(file).toFixed(2) : 0} Mb
        </span>
      </Button>
      <Button className="hover:opacity-50" onClickFunction={removeFile}>
        <HighlightOffIcon />
      </Button>
    </div>
  );
}
