export const myPlugin = {
  install(app: any) {
    const $message: Object = (html: string): void => {
      // @ts-ignore
      M.toast({ html, classes: 'top' })
    }
    const $error: Object = (html: string): void => {
      // @ts-ignore
      M.toast({ html: `[Ошибка]: ${html}` })
    }
    app.provide('$message', $message)
    app.provide('$error', $error)
  },
}
