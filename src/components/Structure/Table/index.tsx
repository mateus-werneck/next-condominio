import DefaultButton from '@Components/Structure/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider } from '@mui/material';
import {
  GridColDef,
  GridRowSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from '@mui/x-data-grid';
import { useCallback, useState } from 'react';
import { StyledDataGrid } from './style';
import { localeText, theme } from './utils/customTable';

interface ITableData {
  name: string;
  columns: GridColDef[];
  rows: object[];
  rowsPerPage?: number;
  checkBoxSelection?: boolean;
  customToolbar?: JSX.Element[];
  onDelete?: (selectedRows: string[]) => void;
}

export default function StandardTable(props: ITableData) {
  const { CustomToolbar, handleSelection } = useCustomTable(props);

  return (
    <div className="flex mt-4 items-center justify-center w-full h-full">
      <ThemeProvider theme={theme}>
        <StyledDataGrid
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: props.rowsPerPage ? props.rowsPerPage : 25
              }
            }
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          key={props.name}
          columns={props.columns}
          rows={props.rows}
          localeText={localeText}
          slots={{
            toolbar: CustomToolbar
          }}
          onRowSelectionModelChange={handleSelection}
          checkboxSelection={
            props.checkBoxSelection == undefined
              ? true
              : props.checkBoxSelection
          }
        />
      </ThemeProvider>
    </div>
  );
}

function useCustomTable(props: ITableData) {
  const customBarElements = getCustomBarElements();
  const [customToolbar, setCustomToolbar] =
    useState<JSX.Element[]>(customBarElements);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const CustomToolbar = useCallback(() => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        {customToolbar}
      </GridToolbarContainer>
    );
  }, [customToolbar]);

  function getCustomBarElements() {
    return props.customToolbar !== undefined
      ? props.customToolbar
      : ([] as JSX.Element[]);
  }

  const handleSelection = (newSelection: GridRowSelectionModel) => {
    if (props.onDelete === undefined) return;

    setSelectedRows(newSelection.map((row) => String(row)));

    if (!newSelection.length) {
      setCustomToolbar(customBarElements);
      return;
    }

    if (hasDeleteButtonAlready()) return;

    const deleteButton = getDeleteButton();
    setCustomToolbar(
      (previousValue: JSX.Element[]) =>
        [...previousValue, deleteButton] as JSX.Element[]
    );
  };

  function hasDeleteButtonAlready(): boolean {
    return (
      customToolbar.find((element) => element.key === getDeleteButtonKey()) !==
      undefined
    );
  }

  function getDeleteButton() {
    return (
      <DefaultButton
        key={getDeleteButtonKey()}
        variant="text"
        onClickFunction={() => props.onDelete && props.onDelete(selectedRows)}
      >
        <DeleteIcon fontSize="small" />
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
