import Button from '@Components/Structure/Button';
import {
  ChangeEvent,
  DragEvent,
  DragEventHandler,
  useRef,
  useState
} from 'react';
import { IDefaultFormInputProps } from '../../types';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import FileOpenIcon from '@mui/icons-material/FileOpen';

export interface IStandardFileInput
  extends Omit<IDefaultFormInputProps, 'options' | 'multiselect'> {
  control: Control<any, any>;
  setValue: UseFormSetValue<any>;
}

export default function StandardFileInput({
  control,
  ...props
}: IStandardFileInput) {
  const ref = useRef<HTMLInputElement>(null);

  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!ref.current) return;

    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!ref.current) return;

    const fileUploaded = event.dataTransfer.files[0];
    console.log(fileUploaded);
  };

  return (
    <>
      <Controller
        name={props.name}
        control={control}
        rules={{ required: props.required ?? false }}
        render={() => (
          <>
            <Button
              className={`p-4 ${
                isDropping ? 'bg-slate-700' : 'bg-transparent'
              }`}
              onClickFunction={(e) => {
                e.preventDefault();
                ref.current?.click();
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
              <div className="flex">
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
              ref={ref}
              multiple={false}
              onChange={handleChange}
            />
          </>
        )}
      />
    </>
  );
}
