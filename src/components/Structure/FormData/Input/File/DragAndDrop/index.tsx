import { ChangeEvent, DragEvent, MouseEvent, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { getExtension } from '@Lib/Treat/File';
import { IStandardFileInput } from './types';
import ShowFiles from './ShowFiles';
import FileInfo from './FileInfo';
import DragButton from '@Components/Structure/Button/DragButton';

export default function DragAndDrop({ control, ...props }: IStandardFileInput) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

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
  };

  return (
    <>
      <Controller
        name={props.name}
        control={control}
        rules={{ required: props.required ?? false }}
        render={({ field: { value, onChange, ref, ..._field } }) => (
          <>
            <DragButton
              isDisabled={file !== null}
              onClickFunction={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                inputRef.current?.click();
              }}
              handleDrop={(event: DragEvent<HTMLButtonElement>) =>
                handleDrop(event, onChange)
              }
            />
            <FileInfo fileInfo={props.fileInfo} />
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
