import { createTheme } from '@mui/material';
import { GridLocaleText } from '@mui/x-data-grid';

export const localeText = {
  detailPanelToggle: 'Mostrar Detalhes',
  toolbarColumns: 'Colunas',
  toolbarDensity: 'Tamanho',
  toolbarDensityLabel: 'Tamanho',
  toolbarDensityCompact: 'Pequeno',
  toolbarDensityStandard: 'Médio',
  toolbarDensityComfortable: 'Grande',
  toolbarFilters: 'Filtros',
  toolbarExport: 'Exportar',
  toolbarExportCSV: 'Exportar CSV',
  toolbarExportPrint: 'Imprimir',
  filterPanelColumns: 'Colunas',
  filterPanelOperator: 'Filtro',
  filterPanelInputLabel: 'Valor',
  filterPanelInputPlaceholder: 'Digite um valor',
  filterOperatorContains: 'Contém',
  filterOperatorEquals: 'Igual',
  filterOperatorAfter: 'Depois de',
  filterOperatorBefore: 'Antes de',
  filterOperatorStartsWith: 'Inicia com',
  filterOperatorEndsWith: 'Termina com',
  filterOperatorIsEmpty: 'Vazio',
  filterOperatorIsNotEmpty: 'Preenchido',
  filterOperatorIsAnyOf: 'Qualquer um',
  'filterOperator=': 'Igual',
  'filterOperator<': 'Menor que',
  'filterOperator<=': 'Menor ou igual que',
  'filterOperator>': 'Maior que',
  'filterOperator>=': 'Maior ou igual que',
  'filterOperator!=': 'Diferente de',
  filterOperatorOnOrAfter: 'A partir de',
  filterOperatorOnOrBefore: 'Antes ou igual',
  filterOperatorIs: 'Igual',
  filterOperatorNot: 'Diferente de',
  columnMenuHideColumn: 'Ocultar',
  columnMenuFilter: 'Filtro',
  columnMenuManageColumns: 'Colunas',
  columnMenuSortAsc: 'Ordenar ascendente',
  columnMenuSortDesc: 'Ordenar descendente',
  columnMenuUnsort: 'Remover ordenação',
  columnsPanelHideAllButton: 'Ocultar todas',
  columnsPanelShowAllButton: 'Mostrar todas',
  columnsPanelTextFieldLabel: 'Buscar coluna',
  columnsPanelTextFieldPlaceholder: 'Nome da coluna',
  checkboxSelectionHeaderName: 'Exibir Caixa de Seleção',
  noRowsLabel: 'Nenhum registro encontrado.',
  noResultsOverlayLabel: 'Nenhum registro encontrado.',
  rowReorderingHeaderName: 'Ordenar',
  footerTotalRows: 'Total de linhas',
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount} de ${totalCount} linhas`,
  footerRowSelected: (count) => `Selecionado: ${count} linha(s)`
} as Partial<GridLocaleText>;

export const theme = createTheme({
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
