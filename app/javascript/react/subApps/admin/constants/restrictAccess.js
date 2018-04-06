export const authorizeUserRole = (authorized, push, flashNotice) => {
  if (!authorized) {
    push('/')
    flashNotice({ alert: 'Restricted.' })
  }
}
