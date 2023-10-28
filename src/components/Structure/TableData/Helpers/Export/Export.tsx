import CustomIcon from '@Components/Structure/CustomIcon';
import { alertEditFailed } from '@Lib/Alerts/customActions';
import { clientConn } from '@Lib/Client/api';
import { GridToolbarExportContainer } from '@mui/x-data-grid';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';

export default function Export({ rows }: { rows: any[] }) {
  const styles =
    'flex w-full justify-start items-center font-normal leading-6 bg-transparent indent-4 hover:bg-black/[.04] min-w-[80px] min-h-[40px]';
  const ExportExcel = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    return (
      <button
        className={styles}
        onClick={(e) => {
          e.preventDefault();
          setLoading(true);

          clientConn
            .post('/export/xlsx', rows)
            .then((response) => {
              const { file } = response.data;
              const buffer = Buffer.from(file, 'base64');
              const blob = new Blob([buffer]);

              const ancor = document.createElement('a');

              ancor.href = URL.createObjectURL(blob);
              ancor.download =
                'excel-export-' + new Date().toLocaleDateString() + '.xlsx';
              ancor.click();
            })
            .catch(() => alertEditFailed())
            .finally(() => setLoading(false));
        }}
      >
        <div className="flex p-4">
          {!isLoading ? (
            <CustomIcon src="XLSX" alt="EXPORT_XLSX_ICON" />
          ) : (
            <CircularProgress size={16} />
          )}
          Excel
        </div>
      </button>
    );
  };

  const ExportJson = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    return (
      <button
        className={styles}
        onClick={(e) => {
          e.preventDefault();
          setLoading(true);
          const content = JSON.stringify(rows);
          const ancor = document.createElement('a');

          ancor.href = `data:application/json,${content}`;
          ancor.download =
            'json-export-' + new Date().toLocaleDateString() + '.json';
          ancor.click();

          setLoading(false);
        }}
      >
        <div className="flex p-4">
          {!isLoading ? (
            <CustomIcon src="JSON" alt="EXPORT_JSON_ICON" />
          ) : (
            <CircularProgress size={16} />
          )}
          Json
        </div>
      </button>
    );
  };

  return (
    <GridToolbarExportContainer>
      <ExportExcel />
      <ExportJson />
    </GridToolbarExportContainer>
  );
}
