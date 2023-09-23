import { SxProps, Theme } from '@mui/material';

export const AutoCompleteStyles: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    borderRadius: '0.375rem'
  },
  '& .MuiOutlinedInput-root': {
    borderColor: 'rgb(186 230 253)',
    '&:hover fieldset': {
      border: '2px solid rgb(186 230 253)'
    }
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(186 230 253)',
    '--tw-ring-opacity': 1,
    '--tw-ring-color': 'rgb(186 230 253 / var(--tw-ring-opacity))',
    '--tw-ring-offset-shadow':
      'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
    '--tw-ring-shadow':
      'var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
    boxShadow:
      'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)'
  },
  '& .MuiFormLabel-root': {
    fontSize: '0.75rem'
  }
};
