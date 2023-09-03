import { SxProps, Theme } from '@mui/material';

export const DataGridCustomStyles: SxProps<Theme> = {
  '& .MuiDataGrid-toolbarContainer': {
    'a, button': {
      color: 'var(--black)',
      fontSize: '0.7rem',
      '&:hover': {
        filter: 'brightness(1.5)'
      }
    }
  },
  '& .MuiDataGrid-columnHeaders': {
    background: 'var(--light-gray) !important'
  },
  '& .MuiDataGrid-row': {
    '&:nth-of-type(odd)': {
      background: 'var(--gray-50)'
    },
    '&:nth-of-type(even)': {
      background: 'var(--gray-light)'
    }
  },
  '& .MuiDataGrid-footerContainer': {
    background: 'var(--light-gray) !important'
  },
  '& .MuiDataGrid-columnHeader': {
    '&:focus': {
      outline: 'none'
    }
  },
  '& .MuiDataGrid-virtualScroller': {
    minHeight: '50px'
  }
};
