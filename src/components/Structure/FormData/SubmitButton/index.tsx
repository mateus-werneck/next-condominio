import Button from '@Components/Structure/Button';
import BlockIcon from '@mui/icons-material/Block';
import { CircularProgress } from '@mui/material';
import { useMemo } from 'react';

interface ISubmitButton {
  isBlocked: boolean;
  isSubmitting: boolean;
  label: string;
}

export default function SubmitButton({
  isBlocked,
  isSubmitting,
  label
}: ISubmitButton) {
  const submitText = useMemo(() => {
    if (isSubmitting) return <CircularProgress color="info" size={16} />;
    return label;
  }, [isSubmitting, label]);

  if (isBlocked) {
    return (
      <Button
        type="submit"
        disable={true}
        className="bg-gray-500 text-black px-4 py-1 font-bold"
      >
        <BlockIcon fontSize="small" />
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      disable={isSubmitting}
      className="bg-slate-700 text-white px-4 py-1 hover:shadow-button hover:bg-gradient-to-r from-slate-700 to-slate-500"
    >
      {submitText}
    </Button>
  );
}
