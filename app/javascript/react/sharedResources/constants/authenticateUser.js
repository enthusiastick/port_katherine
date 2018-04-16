const authenticateUser = (authorized, push, flashNotice) => {
  if (!authorized) {
    push('/sign-in')
    flashNotice({ alert: 'You must be signed in to continue.' })
  }
}

export default authenticateUser
