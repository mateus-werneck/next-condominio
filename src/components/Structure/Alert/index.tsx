import Swal, { SweetAlertOptions } from 'sweetalert2';

export interface IAlert {
  title?: string;
  message: string;
  variant: 'info' | 'success' | 'error' | 'warning' | 'question';
  cancelButton?: boolean;
  focusCancel?: boolean;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  timer?: number;
  callbackFunction?: () => void | Promise<void>;
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
    allowEscapeKey: props.allowEscapeKey === true,
    focusCancel: props.focusCancel === true
  };

  appendTitle(config, props.title);
  appendTimer(config, props.timer);

  Swal.fire(config).then((value) => {
    if (!props.callbackFunction) {
      return;
    }
    if (
      value.isConfirmed ||
      (value.isDismissed && value.dismiss == Swal.DismissReason.timer)
    ) {
      props.callbackFunction();
    }
  });
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
