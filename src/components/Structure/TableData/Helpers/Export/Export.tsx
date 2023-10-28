import CustomIcon from '@Components/Structure/CustomIcon';
import { GridToolbarExportContainer } from '@mui/x-data-grid';

export default function Export({ rows }: { rows: any[] }) {
  const styles =
    'flex w-full justify-start items-center font-normal leading-6 bg-transparent indent-4 hover:bg-black/[.04] min-w-[80px] min-h-[40px]';
  const ExportExcel = () => (
    <button
      className={styles}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex p-4">
        <CustomIcon src="XLSX" alt="EXPORT_XLSX_ICON" />
        EXCEL
      </div>
    </button>
  );
  const ExportJson = () => (
    <button
      className={styles}
      onClick={(e) => {
        e.preventDefault();
        const content = JSON.stringify(rows);
        const ancor = document.createElement('a');

        ancor.href = `data:application/json,${content}`;
        ancor.download =
          'json-export-' + new Date().toLocaleDateString() + '.json';
        ancor.click();
      }}
    >
      <div className="flex p-4">
        <CustomIcon src="JSON" alt="EXPORT_JSON_ICON" />
        JSON
      </div>
    </button>
  );

  return (
    <GridToolbarExportContainer>
      <ExportExcel />
      <ExportJson />
    </GridToolbarExportContainer>
  );
}
