import React, { Component } from 'react'

import NavigationButton from '../components/NavigationButton'
import { signedInNavigationLinks, signedOutNavigationLinks } from '../constants/navigationLinks'

class Navigation extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getCurrentUser()
  }

  render() {
    let links = signedOutNavigationLinks

    if (this.props.currentUser.id) {
      links = signedInNavigationLinks
    }

    let buttons = links.map(link => {
      return(
        <NavigationButton
          key={link.url}
          currentPath={this.props.location.pathname}
          icon={link.icon}
          label={link.label}
          url={link.url}
        />
      )
    })

    return(
      <div className="bottomless button-group expanded stacked-for-small">
        {buttons}
      </div>
    )
  }
}

export default Navigation
