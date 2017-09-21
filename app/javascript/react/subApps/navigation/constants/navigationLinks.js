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
    url: 'admin/events'
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
    url: 'admin/events'
  }
]

export { signedInNavigationLinks, signedOutNavigationLinks }
