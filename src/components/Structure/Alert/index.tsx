import Swal, { SweetAlertOptions } from 'sweetalert2';

interface IAlert {
  title?: string;
  message: string;
  variant: 'info' | 'success' | 'error' | 'warning' | 'question';
  cancelButton?: boolean;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  timer?: number;
  callbackFunction?: () => void;
}

export function Alert(props: IAlert) {
  const config: SweetAlertOptions = {
    text: props.message,
    icon: props.variant,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancelar',
    showCancelButton: props.cancelButton === true,
    allowOutsideClick: props.allowOutsideClick === true,
    allowEscapeKey: props.allowEscapeKey === true
  };

  appendTitle(config, props.title);
  appendTimer(config, props.timer);

  Swal.fire(config).then(
    () => props.callbackFunction && props.callbackFunction()
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
