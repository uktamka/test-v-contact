import { Notify } from 'quasar'

export function showErrorNotification(error: any): void {
  let message =
    error?.response?.data?.message ||
    error?.response?.data?.messages ||
    error?.response?.data?.error?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.errors ||
    error?.response?.data?.error?.messages ||
    error?.response?.message ||
    error?.response?.messages ||
    error?.message ||
    'Unknown Error'

  if (Array.isArray(message)) {
    message = message.join(', ')
  } else {
    message = JSON.stringify(message)
  }

  Notify.create({
    color: 'red',
    textColor: 'white',
    icon: 'error',
    message,
  })
}

export function showSuccessNotification(message: string): void {
  message &&
    Notify.create({
      color: 'green',
      textColor: 'white',
      icon: 'done',
      message,
    })
}
