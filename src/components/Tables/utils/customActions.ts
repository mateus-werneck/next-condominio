import { Alert } from '@Components/Structure/Alert';

interface IDeleteAction {
  info: IEntityInfo;
  callback: (value: (previousValue: any[]) => any[]) => void;
}

interface IEntityInfo {
  id: string;
  endpoint: string;
}

interface Entity {
  id: string;
}

export async function onDeleteAction({
  info: { id, endpoint },
  callback
}: IDeleteAction) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SYSTEM_URL}/api/${endpoint}/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    Alert({
      title: 'Falha ao remover registro',
      message: 'Por favor, tente novamente.',
      variant: 'error',
      allowOutsideClick: true,
      allowEscapeKey: true
    });
    Promise.resolve();
  }

  callback((previousValue: Entity[]) =>
    previousValue.filter((expense) => expense.id != id)
  );

  Alert({
    message: 'Alterações salvas com sucesso.',
    variant: 'success',
    timer: 1500
  });
}
