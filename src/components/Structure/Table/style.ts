import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';

export const StyledDataGrid = styled(DataGrid)`
  div.MuiDataGrid-toolbarContainer {
    a,
    button {
      color: var(--green);

      &:hover {
        filter: brightness(0.8);
      }
    }
  }

  div.MuiDataGrid-columnHeaders {
    background: var(--light-gray) !important;
  }

  div.MuiDataGrid-row {
    &:nth-of-type(odd) {
      background: var(--gray-50);
    }

    &:nth-of-type(even) {
      background: var(--gray-light);
    }
  }

  div.MuiDataGrid-footerContainer {
    background: var(--light-gray) !important;
  }

  div.MuiDataGrid-columnHeader {
    &:focus {
      outline: none;
    }
  }

  div.MuiDataGrid-virtualScroller {
    min-height: 50px;
  }
`;
