import Button from '@Components/Structure/Button';
import { ChangeEvent, DragEvent, MouseEvent, useRef, useState } from 'react';
import { IDefaultFormInputProps } from '../../types';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export interface IStandardFileInput
  extends Omit<IDefaultFormInputProps, 'options' | 'multiselect'> {
  control: Control<any, any>;
  setValue: UseFormSetValue<any>;
}

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
    props.setValue('importFile', filesUploaded, { shouldValidate: true });
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
              className={`p-4 ${
                isDropping || file !== null ? 'bg-slate-700' : 'bg-transparent'
              }`}
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
              <div className="flex flex-col">
                <FileOpenIcon
                  style={{
                    width: 320,
                    height: 320,
                    color: 'var(--gray-lighter)'
                  }}
                />
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
              } flex flex-row p-4 text-slate-700 items-center justify-center gap-2`}
            >
              <Button
                className="max-w-fit hover:shadow-button"
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
                {file?.name}
              </Button>
              <Button
                className="max-w-fit hover:opacity-50"
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