import { Alert, IAlert } from '@Components/Structure/Alert';
import Button from '@Components/Structure/Button';
import { useDevice } from '@Contexts/useDevice';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  GridCellEditStopParams,
  GridColDef,
  GridRowSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton
} from '@mui/x-data-grid';
import { useCallback, useState } from 'react';
import { ITableData } from '../../types';
import Export from '../Export/Export';

export default function ActionsTable(props: ITableData) {
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
        <Export rows={props.rows} />
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
    if (!props.onBatchDelete) return;

    const currentSelectedRows = newSelection.map((row) => String(row));

    if (!newSelection.length) return hideDeleteButton();

    showDeleteButton(currentSelectedRows);
  };

  function hideDeleteButton(): void {
    setCustomToolbar(customBarElements);
  }

  function showDeleteButton(currentSelectedRows: string[]): void {
    const deleteButton = getDeleteButton(currentSelectedRows);

    setCustomToolbar((previousValue: JSX.Element[]) => {
      const previousButton = customToolbar.find(
        (element) => element.key === getDeleteButtonKey()
      );

      const customToolBar = previousValue.filter((element) =>
        previousButton ? element.key != previousButton.key : true
      );

      return [...customToolBar, deleteButton] as JSX.Element[];
    });
  }

  function getDeleteButton(currentSelectedRows: string[]) {
    return (
      <Button
        key={getDeleteButtonKey()}
        className="bg-transperent hover:bg-light-blue/4"
        onClickFunction={() =>
          props.onBatchDelete && props.onBatchDelete(currentSelectedRows)
        }
      >
        <div className="flex gap-1">
          <DeleteIcon className="font-bold w-6 h-6 pt-1 sm:pb-1 sm:pt-0" />
          <span className="font-medium sm:font-normal">REMOVER</span>
        </div>
      </Button>
    );
  }

  function getDeleteButtonKey(): string {
    return `${props.name}_MuiTableDeleteButton`;
  }

  function getColumnVisibility(): Record<string, boolean> {
    const columnVisibility: Record<string, boolean> = {
      __check__: false
    };

    if (!isMobileView()) return columnVisibility;

    props.columns.forEach((column: GridColDef, index: number) => {
      if (index && column.field != 'actions')
        columnVisibility[column.field] = false;
    });

    return columnVisibility;
  }

  async function handleRowUpdate(
    newRow: GridCellEditStopParams,
    oldRow: GridCellEditStopParams
  ): Promise<GridCellEditStopParams> {
    if (!props.onRowUpdate) return oldRow;

    const alertParams: IAlert = {
      title: 'Confirmar alterações.',
      message: 'Deseja salvar as alterações?',
      variant: 'warning',
      allowEnterClick: false,
      cancelButton: true,
      callbackFunction: () =>
        props.onRowUpdate && props.onRowUpdate(newRow, oldRow)
    };

    try {
      const row = await Alert(alertParams);
      return row ?? oldRow;
    } catch (error) {
      return oldRow;
    }
  }

  return {
    CustomToolbar,
    handleSelection,
    getColumnVisibility,
    handleRowUpdate
  };
}
