const authenticateUserLodgingQuestionnaire = (authorized, push, flashNotice) => {
  if (!authorized) {
    push('/events')
    flashNotice({ alert: 'You are not authorized to access this content.' })
  }
}

export default authenticateUserLodgingQuestionnaire
