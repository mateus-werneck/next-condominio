import Button from '@Components/Structure/Button';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';

type TFileInfo = {
  fileInfo: {
    message: string;
    fields: string[];
  };
};
export default function FileInfo({ fileInfo }: TFileInfo) {
  const [showFileInfo, setShowFileInfo] = useState<boolean>(false);

  if (!fileInfo) return <></>;

  const { message, fields } = fileInfo;

  return (
    <>
      <Button
        className="flex flex-col text-slate-300 self-end p-4 md:hover:text-slate-700"
        onClickFunction={() =>
          setShowFileInfo((previousValue: boolean) => !previousValue)
        }
      >
        <InfoIcon />
      </Button>
      <div
        className={
          showFileInfo
            ? 'flex flex-col'
            : 'hidden' + ' gap-4 p-4 bg-slate-200 rounded-md text-sm'
        }
      >
        <p>{message}</p>
        <div className="flex flex-col">
          {fields.map((field: string) => (
            <span
              key={field}
              className="border border-black p-2 text-left font-bold"
            >
              {field}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
