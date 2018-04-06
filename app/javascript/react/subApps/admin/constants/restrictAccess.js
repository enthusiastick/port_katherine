export const restrictToAdmin = (user, push, flashNotice) => {
  if (user.role != 'admin') {
    push('/')
    flashNotice({ alert: 'Restricted.' })
  }
}

export const restrictToPlotStaff = (user, push, flashNotice) => {
  if (!['admin', 'plot_staff'].includes(user.role)) {
    push('/')
    flashNotice({ alert: 'Restricted.' })
  }
}

export const authorizePlotStaff = (isPlotStaff, push, flashNotice) => {
  if (!isPlotStaff) {
    push('/')
    flashNotice({ alert: 'Restricted.' })
  }
}
