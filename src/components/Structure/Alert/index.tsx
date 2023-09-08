import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

export interface IAlert {
  title?: string;
  message: string;
  variant: 'info' | 'success' | 'error' | 'warning' | 'question';
  cancelButton?: boolean;
  focusCancel?: boolean;
  allowEnterClick?: boolean;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  timer?: number;
  callbackFunction?: () => any | Promise<any>;
}

export function Alert(props: IAlert) {
  const config: SweetAlertOptions = {
    text: props.message,
    icon: props.variant,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancelar',
    cancelButtonColor: 'rgb(234 88 12)',
    showCancelButton: props.cancelButton === true,
    allowOutsideClick: props.allowOutsideClick === true,
    allowEnterKey: props.allowEnterClick ?? true,
    allowEscapeKey: props.allowEscapeKey === true,
    focusCancel: props.focusCancel === true
  };

  appendTitle(config, props.title);
  appendTimer(config, props.timer);

  return Swal.fire(config).then((value) => handleCallback(value, props));
}

function handleCallback(value: SweetAlertResult, props: IAlert) {
  if (!props.callbackFunction) {
    return;
  }
  if (isSwalConfirmed(value)) return props.callbackFunction();
}

function isSwalConfirmed(value: SweetAlertResult): boolean {
  return (
    value.isConfirmed ||
    (value.isDismissed && value.dismiss == Swal.DismissReason.timer)
  );
}

function appendTitle(config: SweetAlertOptions, title?: string) {
  if (title) config.title = title;
}

function appendTimer(config: SweetAlertOptions, timer?: number) {
  if (timer) {
    config.timer = timer;
    config.showConfirmButton = false;
  }
}
