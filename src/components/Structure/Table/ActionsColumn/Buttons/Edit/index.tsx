import DefaultButton from '@Components/Structure/Button';
import Modal from '@Components/Structure/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { ITableEditButton } from '../../types';

export default function Edit({
  table,
  row,
  onEditRow
}: ITableEditButton): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {showModal && <Modal setShowModal={setShowModal}>{onEditRow(row)}</Modal>}
      <DefaultButton
        key={`${table}_Edit_${row.id}`}
        color="primary"
        onClickFunction={() =>
          setShowModal((previousValue: boolean) => !previousValue)
        }
      >
        <VisibilityIcon fontSize="small" key={`${table}_Edit_${row.id}`} />
      </DefaultButton>
    </>
  );
}
