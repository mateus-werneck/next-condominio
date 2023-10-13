import Button from '@Components/Structure/Button';
import { ChangeEvent, DragEvent, MouseEvent, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IStandardFileInput } from './types';

export default function StandardFileInput({
  control,
  ...props
}: IStandardFileInput) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;

    const filesUploaded = event.target.files;

    if (!filesUploaded) return;

    setFile(filesUploaded[0]);
    props.setValue('importFile', filesUploaded[0], { shouldValidate: true });
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!inputRef.current) return;

    const fileUploaded = event.dataTransfer.files[0];

    setFile(fileUploaded);
    props.setValue('importFile', fileUploaded, { shouldValidate: true });
    setTimeout(() => setIsDropping(false), 500);
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
              onDrop={handleDrop}
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
            <input
              className="hidden"
              type="file"
              ref={inputRef}
              multiple={false}
              onChange={handleChange}
              accept={props.accept}
              {..._field}
            />
            <div
              className={`${
                file !== null ? 'visible' : 'invisible'
              } flex flex-col max-w-xs p-4 text-slate-700 items-center justify-between gap-2`}
            >
              <Button
                className="flex flex-col p-4 text-sm md:text-md bg-slate-200 rounded-md gap-4 hover:bg-slate-500"
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
                <span className="text-sm break-all">{file?.name}</span>
                <span className="font-bold">
                  {' '}
                  {Number(file?.size ?? 0) / Math.pow(10, 6)} Mb
                </span>
              </Button>
              <Button
                className="hover:opacity-50"
                onClickFunction={() => {
                  setFile(null);
                  props.setValue('importFile', undefined, {
                    shouldValidate: true
                  });
                }}
              >
                <HighlightOffIcon />
              </Button>
            </div>
          </>
        )}
      />
    </>
  );
}
