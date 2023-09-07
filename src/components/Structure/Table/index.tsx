import DefaultButton from '@Components/Structure/Button';
import { useDevice } from '@Contexts/useDevice';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton
} from '@mui/x-data-grid';
import { useCallback, useState } from 'react';
import { appendColumnConfig } from './utils/columns';
import CustomGridToolbarExport from './utils/customExport';
import { DataGridCustomStyles } from './utils/customStyle';
import { localeText, theme } from './utils/customTable';

interface ITableData {
  name: string;
  columns: GridColDef[];
  rows: object[];
  rowsPerPage?: number;
  checkBoxSelection?: boolean;
  customToolbar?: JSX.Element[];
  onBatchDelete?: (selectedRows: string[]) => void;
  loading?: boolean;
}

export default function StandardTable(props: ITableData) {
  const { CustomToolbar, handleSelection } = useCustomActions(props);
  const { isMobileView } = useDevice();

  function getColumnVisibility(): Record<string, boolean> {
    const columnVisibility: Record<string, boolean> = {
      __check__: false
    };

    if (!isMobileView()) return columnVisibility;

    props.columns.forEach((column: GridColDef, index) => {
      if (index && column.field != 'actions')
        columnVisibility[column.field] = false;
    });

    return columnVisibility;
  }

  return (
    <div className="flex mt-4 items-center justify-center h-full max-w-max">
      <ThemeProvider theme={theme}>
        <DataGrid
          slotProps={{
            panel: {
              sx: {
                top: '-60px !important'
              }
            }
          }}
          sx={DataGridCustomStyles}
          className="text-xs sm:text-base"
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: props.rowsPerPage ? props.rowsPerPage : 25
              }
            },
            columns: {
              columnVisibilityModel: getColumnVisibility()
            }
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          key={props.name}
          columns={props.columns.map(appendColumnConfig)}
          rows={props.rows}
          localeText={localeText}
          slots={{
            toolbar: CustomToolbar
          }}
          onRowSelectionModelChange={handleSelection}
          checkboxSelection={props.checkBoxSelection ?? true}
          loading={
            props.loading !== undefined
              ? props.loading
              : props.rows === undefined
          }
        />
      </ThemeProvider>
    </div>
  );
}

function useCustomActions(props: ITableData) {
  const { isMobileView } = useDevice();
  const customBarElements = getCustomBarElements();
  const [customToolbar, setCustomToolbar] =
    useState<JSX.Element[]>(customBarElements);

  const CustomToolbar = useCallback(() => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        {!isMobileView() && <GridToolbarDensitySelector />}
        <CustomGridToolbarExport rows={props.rows} />
        {customToolbar}
      </GridToolbarContainer>
    );
  }, [customToolbar, isMobileView, props.rows]);

  function getCustomBarElements() {
    return props.customToolbar !== undefined
      ? props.customToolbar
      : ([] as JSX.Element[]);
  }

  const handleSelection = (newSelection: GridRowSelectionModel) => {
    if (!shouldHandleSelection()) return;

    const currentSelectedRows = newSelection.map((row) => String(row));

    if (newSelection.length) {
      showDeleteButton(currentSelectedRows);
    } else {
      hideDeleteButton();
    }
  };

  function shouldHandleSelection(): boolean {
    return props.onBatchDelete !== undefined;
  }

  function showDeleteButton(currentSelectedRows: string[]): void {
    if (isDeleteButtonVisible()) return;

    const deleteButton = getDeleteButton(currentSelectedRows);

    setCustomToolbar(
      (previousValue: JSX.Element[]) =>
        [...previousValue, deleteButton] as JSX.Element[]
    );
  }

  function isDeleteButtonVisible(): boolean {
    const deleteButton = customToolbar.find(
      (element) => element.key === getDeleteButtonKey()
    );
    return deleteButton !== undefined;
  }

  function hideDeleteButton(): void {
    setCustomToolbar(customBarElements);
  }

  function getDeleteButton(currentSelectedRows: string[]) {
    return (
      <DefaultButton
        key={getDeleteButtonKey()}
        variant="text"
        styles={{ color: 'var(--gray-700)' }}
        onClickFunction={() =>
          props.onBatchDelete && props.onBatchDelete(currentSelectedRows)
        }
      >
        <DeleteIcon
          style={{ maxWidth: '16px', maxHeight: '16px' }}
          color="error"
        />
        Remover
      </DefaultButton>
    );
  }

  function getDeleteButtonKey(): string {
    return `${props.name}_MuiTableDeleteButton`;
  }

  return {
    CustomToolbar,
    handleSelection
  };
}
