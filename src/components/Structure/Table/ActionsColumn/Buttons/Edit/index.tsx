import ResidentForm from '@Components/Forms/Resident/Edit';
import DefaultButton from '@Components/Structure/Button';
import Modal from '@Components/Structure/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Resident } from '@prisma/client';
import { useState } from 'react';
import { ITableEditButton } from '../../types';

export default function Edit({ row, table }: ITableEditButton): JSX.Element {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      {showForm && (
        <Modal>
          <ResidentForm resident={row as Resident} alignment="center" />
        </Modal>
      )}
      <DefaultButton
        key={`${table}_Edit_${row.id}`}
        color="primary"
        onClickFunction={() =>
          setShowForm((previousValue: boolean) => !previousValue)
        }
      >
        <VisibilityIcon fontSize="small" key={`${table}_Edit_${row.id}`} />
      </DefaultButton>
    </>
  );
}
