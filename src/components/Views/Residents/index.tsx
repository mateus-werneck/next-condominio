'use client';

import ResidentForm from '@Components/Forms/Resident/Edit';
import FormCard from '@Components/Structure/Card/Form/FormCard';
import Modal from '@Components/Structure/Modal';
import TableListResidents from '@Components/Tables/Residents';
import { useTableReducer } from '@Reducers/tableActions/reducer';
import { Resident } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';

interface IViewResidents {
  rows: Resident[];
  editRow: Resident | null;
}

export default function ViewResidents({ editRow, rows }: IViewResidents) {
  const initialState = {
    editRow,
    rows,
    loading: false
  };

  const reducer = useTableReducer<Resident>(initialState);

  const router = useRouter();
  const path = usePathname();

  return (
    <>
      <Modal
        onClose={() => {
          reducer.dispatch({ type: 'cancelEdit' });
          router.push(path);
        }}
        isVisible={reducer.state.editRow !== null}
      >
        <FormCard
          title={reducer.state.editRow?.id ? 'Apartamento' : 'Novo morador'}
          id={reducer.state.editRow?.id ?? 'new'}
          hashTag={
            reducer.state.editRow?.id &&
            String(reducer.state.editRow?.apartment)
          }
        >
          <ResidentForm
            resident={reducer.state.editRow ?? ({} as Resident)}
            alignment="center"
            formSubmitCallback={(payload: Resident, type: string) => {
              switch (type) {
                case 'create':
                  reducer.dispatch({
                    type: 'reload',
                    payload: { route: '/residents' }
                  });
                case 'update':
                  reducer.dispatch({ type: 'updateRow', payload });
                default:
                  return;
              }
            }}
          />
        </FormCard>
      </Modal>
      <TableListResidents reducer={reducer} />
    </>
  );
}
