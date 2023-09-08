import { ThemeProvider } from '@mui/material';
import { DataGrid, GridSlotsComponentsProps } from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import useCustomActions from './Helpers/Actions/Actions';
import { treatColumns } from './Helpers/Columns/Column';
import Locale from './Helpers/Locale/Locale';
import Styles from './Helpers/Styles/Styles';
import Theme from './Helpers/Theme/Theme';
import { ITableData } from './types';

export default function StandardTable(props: ITableData) {
  const {
    CustomToolbar,
    handleSelection,
    getColumnVisibility,
    handleRowUpdate
  } = useCustomActions(props);

  const initialState: GridInitialStateCommunity = {
    pagination: {
      paginationModel: {
        pageSize: props.rowsPerPage ?? 25
      }
    },
    columns: {
      columnVisibilityModel: getColumnVisibility()
    }
  };

  const slotProps: GridSlotsComponentsProps = {
    panel: {
      sx: {
        top: '-60px !important'
      }
    }
  };

  const columns = treatColumns(props.columns, props.onRowUpdate !== undefined);

  return (
    <div className="flex mt-4 items-center justify-center h-full max-w-max">
      <ThemeProvider theme={Theme}>
        <DataGrid
          slotProps={slotProps}
          sx={Styles}
          className="text-xs sm:text-base"
          initialState={initialState}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          key={props.name}
          columns={columns}
          rows={props.rows}
          localeText={Locale}
          disableRowSelectionOnClick
          slots={{ toolbar: CustomToolbar }}
          onRowSelectionModelChange={handleSelection}
          processRowUpdate={handleRowUpdate}
          checkboxSelection={props.checkBoxSelection ?? true}
          loading={props.loading ?? props.rows === undefined}
        />
      </ThemeProvider>
    </div>
  );
}
