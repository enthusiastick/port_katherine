export const restrictToAdmin = (user, push, flashNotice) => {
  if (user.id && user.role != 'admin') {
    push('/')
    flashNotice({ alert: 'Restricted.' })
  }
}

export const restrictToPlotStaff = (user, push, flashNotice) => {
  if (user.id && !['admin', 'plot_staff'].includes(user.role)) {
    push('/')
    flashNotice({ alert: 'Restricted.' })
  }
}
