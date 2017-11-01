const signedInAdminNavigationLinks = [
  {
    icon: 'compass',
    label: 'Home',
    url: ''
  },
  {
    icon: 'user',
    label: 'Account',
    url: 'edit-user'
  },
  {
    icon: 'gavel',
    label: 'Admin',
    url: 'admin'
  },
  {
    icon: 'heartbeat',
    label: 'Characters',
    url: 'characters'
  },
  {
    icon: 'calendar',
    label: 'Events',
    url: 'events'
  },
  {
    icon: 'comments',
    label: 'Forums',
    url: `${process.env.FORUMS_URL}`
  },
  {
    icon: 'sign-out',
    label: 'Sign Out',
    url: 'sign-out'
  }
]

const signedInNavigationLinks = [
  {
    icon: 'compass',
    label: 'Home',
    url: ''
  },
  {
    icon: 'user',
    label: 'Account',
    url: 'edit-user'
  },
  {
    icon: 'heartbeat',
    label: 'Characters',
    url: 'characters'
  },
  {
    icon: 'calendar',
    label: 'Events',
    url: 'events'
  },
  {
    icon: 'comments',
    label: 'Forums',
    url: `${process.env.FORUMS_URL}`
  },
  {
    icon: 'sign-out',
    label: 'Sign Out',
    url: 'sign-out'
  }
]

const signedOutNavigationLinks = [
  {
    icon: 'sign-in',
    label: 'Sign In',
    url: 'sign-in'
  },
  {
    icon: 'compass',
    label: 'Home',
    url: ''
  },
  {
    icon: 'calendar',
    label: 'Events',
    url: 'events'
  },
  {
    icon: 'comments',
    label: 'Forums',
    url: `${process.env.FORUMS_URL}`
  }
]

export {
  signedInAdminNavigationLinks,
  signedInNavigationLinks,
  signedOutNavigationLinks
}
