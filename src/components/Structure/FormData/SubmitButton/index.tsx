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
  if (isBlocked) {
    return (
      <Button
        type="submit"
        disable={true}
        className="bg-slate-300 text-slate-400 px-4 py-1"
      >
        {label}
      </Button>
    );
  }

  if (isSubmitting) {
    return (
      <Button
        type="submit"
        disable={true}
        className="bg-slate-700 text-black px-4 py-1"
      >
        <CircularProgress color="inherit" size={16} />
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      disable={isSubmitting}
      className="bg-slate-700 text-white px-4 py-1 hover:shadow-button hover:translate -translate-x-1 hover:bg-gradient-to-r from-slate-700 to-slate-500"
    >
      {label}
    </Button>
  );
}
