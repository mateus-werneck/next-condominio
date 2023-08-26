import { Alert, IAlert } from '@Components/Structure/Alert';

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

export function alertEditSuccess(
  callbackFunction?: () => void | Promise<void>
) {
  const alertParams: IAlert = {
    message: 'Alterações salvas com sucesso.',
    variant: 'success',
    timer: 1500,
    callbackFunction
  };

  Alert(alertParams);
}

export function alertEditFailed() {
  Alert({
    title: 'Falha na solicitação',
    message: 'Verifique os dados informados.',
    variant: 'error',
    allowOutsideClick: true,
    allowEscapeKey: true
  });
}

export function alertDeletion(
  onConfirmFunction: () => void | Promise<void>
): void {
  Alert({
    title: 'Alerta',
    message: 'Tem certeza que deseja deletar?',
    variant: 'warning',
    cancelButton: true,
    focusCancel: true,
    allowEscapeKey: true,
    allowOutsideClick: true,
    callbackFunction: onConfirmFunction
  });
}

export function alertDeletionFailed(): void {
  Alert({
    title: 'Falha ao remover registro(s).',
    message: 'Por favor, tente novamente.',
    variant: 'error',
    allowOutsideClick: true,
    allowEscapeKey: true
  });
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
    alertDeletionFailed();
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
