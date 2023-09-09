import DefaultButton from '@Components/Structure/Button';
import Modal from '@Components/Structure/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRef, useState } from 'react';
import { ITableEditButton } from '../../types';

export default function Edit({
  table,
  row,
  onEditRow
}: ITableEditButton): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref}>
      {showModal && (
        <Modal setShowModal={setShowModal} parentRef={ref}>
          {onEditRow(row)}
        </Modal>
      )}
      <DefaultButton
        key={`${table}_Edit_${row.id}`}
        color="primary"
        onClickFunction={() =>
          setShowModal((previousValue: boolean) => !previousValue)
        }
      >
        <VisibilityIcon fontSize="small" key={`${table}_Edit_${row.id}`} />
      </DefaultButton>
    </div>
  );
}
