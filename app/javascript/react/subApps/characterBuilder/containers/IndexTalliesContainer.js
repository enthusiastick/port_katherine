import React, { Component } from 'react'

import authenticateUser from '../../../sharedResources/constants/authenticateUser'
import BreadcrumbsNav from '../../../sharedResources/components/BreadcrumbsNav'
import TalliesTable from '../../../sharedResources/components/tallies/TalliesTable'

class IndexTalliesContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.tallies.items.length === 0) {
      this.props.getTallies(this.props.characterId)
    }
  }

  componentWillReceiveProps(nextProps) {
    authenticateUser(nextProps.isSignedIn, this.props.push, this.props.flashNotice)
  }

  render() {
    let breadcrumbs = [{ to: '/characters', label: 'Characters' }, { to: `/characters/${this.props.characterId}`, label: this.props.tallies.meta.characterName }]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Build Logs' />
          <h1 className='top-padded'>Build Logs</h1>
          <TalliesTable itemsPerPage={25} tallies={this.props.tallies.items} />
        </div>
      </div>
    )
  }
}

export default IndexTalliesContainer
