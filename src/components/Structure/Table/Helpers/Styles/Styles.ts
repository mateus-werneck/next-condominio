import { SxProps, Theme } from '@mui/material';

const Styles: SxProps<Theme> = {
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
    marginLeft: '0.5rem',
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
    minWidth: '128px !important',
    '@media (min-width: 1920px)': {
      minWidth: '224px !important'
    },
    '&:focus': {
      outline: 'none'
    }
  },
  '& .MuiDataGrid-virtualScroller': {
    minHeight: '50px'
  },
  '& .MuiDataGrid-cell': {
    minWidth: '128px !important',
    '@media (min-width: 1920px)': {
      minWidth: '224px !important'
    }
  }
};

export default Styles;
