import toastr from "toastr"
import "toastr/build/toastr.min.css"

export function showToast(toastType, message, title) {
  toastr.options = {
    positionClass: "toast-top-right",

    timeOut: 5000,
    extendedTimeOut: 2000,
    closeButton: true,
    debug: false,
    progressBar: true,
    preventDuplicates: false,
    //preventOpenDuplicates: true,
    newestOnTop: false,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    showDuration: 300,
    hideDuration: 1000,
  }

  // setTimeout(() => toastr.success(`Settings updated `), 300)
  //Toaster Types
  if (toastType === "info") toastr.info(message, title)
  else if (toastType === "warning") toastr.warning(message, title)
  else if (toastType === "error") toastr.error(message, title)
  else toastr.success(message, title)
}
export function showToastNotif(toastType, message, title) {
  toastr.options = {
    positionClass: "toast-top-right",

    timeOut: 1500,
    extendedTimeOut: 1000,
    closeButton: true,
    debug: false,
    progressBar: true,
    preventDuplicates: true,
    //preventOpenDuplicates: true,
    newestOnTop: false,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    showDuration: 150,
    hideDuration: 500,
  }

  // setTimeout(() => toastr.success(`Settings updated `), 300)
  //Toaster Types
  if (toastType === "info") toastr.info(message, title)
  else if (toastType === "warning") toastr.warning(message, title)
  else if (toastType === "error") toastr.error(message, title)
  else toastr.success(message, title)
}

export function clearToast() {
  toastr.clear()
}
