import { GridToolbarExportContainer } from '@mui/x-data-grid';

export default function Export({ rows }: { rows: any[] }) {
  const ExportExcel = () => (
    <button className=" flex justify-start items-center font-normal leading-6 bg-transparent indent-4 hover:bg-black/[.04] min-w-[80px] min-h-[40px]">
      Excel
    </button>
  );
  const ExportJson = () => (
    <button
      className=" flex justify-start items-center font-normal leading-6 bg-transparent indent-4 hover:bg-black/[.04] min-w-[80px] min-h-[40px]"
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
      JSON
    </button>
  );

  return (
    <GridToolbarExportContainer>
      <ExportExcel />
      <ExportJson />
    </GridToolbarExportContainer>
  );
}
