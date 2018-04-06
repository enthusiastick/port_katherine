import React, { Component } from 'react'

import { authorizeUserRole } from '../../constants/restrictAccess'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import BackstoriesTabs from '../components/BackstoriesTabs'

class AdminIndexBackstoriesContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.characterId != this.props.backstories.meta.characterId) {
      this.props.getAdminBackstories(this.props.characterId)
    }
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isPlotStaff, this.props.push, this.props.flashNotice)
  }

  render() {
    let breadcrumbs = [
      { to: '/admin/users', label: 'Users'},
      { to: `/admin/users/${this.props.backstories.meta.userId}`, label: this.props.backstories.meta.userId },
      { to: `/admin/characters/${this.props.characterId}`, label: `Character: ${this.props.backstories.meta.characterName}` }
      ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Backstories' />
          <h1 className='text-center top-padded'>Backstories for {this.props.backstories.meta.characterName}</h1>
          <BackstoriesTabs backstories={this.props.backstories.items} />
        </div>
      </div>
    )
  }
}

export default AdminIndexBackstoriesContainer
