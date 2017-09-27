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
    icon: 'calendar',
    label: 'Events',
    url: 'events'
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
    icon: 'calendar',
    label: 'Events',
    url: 'events'
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
  }
]

export {
  signedInAdminNavigationLinks,
  signedInNavigationLinks,
  signedOutNavigationLinks
}
