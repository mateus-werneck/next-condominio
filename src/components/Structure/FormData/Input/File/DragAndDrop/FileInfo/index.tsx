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
        className="flex flex-col text-slate-400 self-end p-4 hover:text-slate-700"
        onClickFunction={() =>
          setShowFileInfo((previousValue: boolean) => !previousValue)
        }
      >
        <InfoIcon />
      </Button>
      {showFileInfo ? (
        <div className="flex flex-col gap-4 p-4 bg-slate-200 rounded-md text-sm ">
          <p>{message}</p>
          <table className="border-collapse w-full">
            <tr>
              {fields.map((field: string) => (
                <th key={field} className="border border-black p-2 text-left">
                  {field}
                </th>
              ))}
            </tr>
          </table>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
