import { createTheme } from '@mui/material';

export default createTheme({
  components: {
    MuiTablePagination: {
      defaultProps: {
        labelRowsPerPage: 'Linhas por página',
        labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count}`
      },
      styleOverrides: {
        root: {
          color: 'black'
        },
        displayedRows: {
          color: 'black'
        },
        toolbar: {
          color: 'black'
        }
      }
    }
  }
});
