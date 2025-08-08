import * as Toaster from "sonner";

type ToastMessage = (() => React.ReactNode) | React.ReactNode
type ToastTypes = 'normal' | 'action' | 'success' | 'info' | 'warning' | 'error' | 'loading' | 'default';

export const toast = (message: ToastMessage | React.ReactNode, data?: Toaster.ExternalToast, variant: ToastTypes = "normal") => {
  if (variant == "success") {
    Toaster.toast.success(message, {...data, richColors: true})
  } else if (variant == "warning") {
    Toaster.toast.warning(message, {...data, richColors: true})
  } else if (variant == "error") {
    Toaster.toast.error(message, {...data, richColors: true})
  } else {
    Toaster.toast(message, data)
  }
}

// import * as Toaster from "sonner";

// type ToastMessage = (() => React.ReactNode) | React.ReactNode
// type ToastTypes = 'normal' | 'action' | 'success' | 'info' | 'warning' | 'error' | 'loading' | 'default';

// export const toast = <T = any>(message: ToastMessage | React.ReactNode, data?: Toaster.ExternalToast, variant: ToastTypes = "normal", promise?: Promise<T>, promiseReturn?: (data: T) => ToastMessage) => {
//   if (promise) {
//     Toaster.toast.promise(promise, {
//       loading: 'Loading...',
//       success: (data: T) => {
//         //return `${data.name} toast has been added`;
//         return promiseReturn ? promiseReturn(data) : "Success" as any
//       },
//       error: 'Error',
//     });
//   } else {
//     Toaster.toast(message)
//   }
// }