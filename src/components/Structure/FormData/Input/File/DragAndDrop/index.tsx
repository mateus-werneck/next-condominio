import Button from '@Components/Structure/Button';
import { ChangeEvent, DragEvent, MouseEvent, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { getExtension } from '@Lib/Treat/File';
import { IStandardFileInput } from './types';
import InfoIcon from '@mui/icons-material/Info';
import ShowFiles from './ShowFiles';

export default function DragAndDrop({ control, ...props }: IStandardFileInput) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [showFileInfo, setShowFileInfo] = useState<boolean>(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    onChange: (event: any) => void
  ) => {
    if (!inputRef.current) return;

    const filesUploaded = event.target.files;

    if (!filesUploaded) return;

    setFile(filesUploaded[0]);
    onChange(filesUploaded[0]);
  };

  const handleDrop = (
    event: DragEvent<HTMLButtonElement>,
    onChange: (event: any) => void
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!inputRef.current) return;

    const fileUploaded = event.dataTransfer.files[0];

    const extension = '.' + getExtension(fileUploaded);
    const validExtensions = props.accept.split(',');

    if (validExtensions.includes(extension)) {
      setFile(fileUploaded);
      onChange(fileUploaded);
    }

    setTimeout(() => setIsDropping(false), 400);
  };

  return (
    <>
      <Controller
        name={props.name}
        control={control}
        rules={{ required: props.required ?? false }}
        render={({ field: { value, onChange, ref, ..._field } }) => (
          <>
            <Button
              className={`w-[240px] md:w-[320px] outline-dashed outline-offset-2 outline-slate-500 self-center items-center justify-center p-4 ${
                isDropping || file !== null
                  ? 'bg-gradient-to-r from-slate-700 to-slate-500 text-white'
                  : 'bg-slate-200 text-[var(--gray-light)]'
              } hover:text-white hover:shadow-button hover:translate -translate-x-1 hover:bg-gradient-to-r from-slate-700 to-slate-500`}
              onClickFunction={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                inputRef.current?.click();
              }}
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
              onDrop={(event: DragEvent<HTMLButtonElement>) =>
                handleDrop(event, onChange)
              }
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <FileOpenIcon
                  sx={{ '&:hover': { color: 'inherit' } }}
                  style={{
                    width: 80,
                    height: 80
                  }}
                />
                <span className={`${file !== null ? 'hidden' : 'visible'}`}>
                  Arraste um arquivo
                </span>
                <span className={`${file !== null ? 'hidden' : 'visible'}`}>
                  Ou clique aqui
                </span>
              </div>
            </Button>
            {props.fileInfo ? (
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
                    <p>{props.fileInfo.message}</p>
                    <table className="border-collapse w-full">
                      <tr>
                        {props.fileInfo.fields.map((field: string) => (
                          <th
                            key={field}
                            className="border border-black p-2 text-left"
                          >
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
            ) : (
              <></>
            )}
            <input
              className="hidden"
              type="file"
              ref={inputRef}
              multiple={false}
              onChange={(event) => handleChange(event, onChange)}
              accept={props.accept}
              {..._field}
            />
            <ShowFiles
              file={file}
              removeFile={() => {
                setFile(null);
                props.setValue('importFile', undefined, {
                  shouldValidate: true
                });
              }}
            />
          </>
        )}
      />
    </>
  );
}
