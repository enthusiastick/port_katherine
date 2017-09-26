const restrictAccess = (user, push, flashNotice) => {
  if (user.role != 'admin') {
    push('/')
    flashNotice({ alert: 'Restricted.' })
  }
}

export default restrictAccess
