import React, { Component } from 'react'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import BackstoriesTabs from '../components/BackstoriesTabs'

class AdminIndexBackstoriesContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.backstories.items.length === 0) {
      this.props.getAdminBackstories(this.props.characterId)
    }
  }

  render() {
    let breadcrumbs = [
      { to: '/admin/users', label: 'Users'},
      { to: `/admin/users/${this.props.backstories.meta.user}`, label: this.props.backstories.meta.user },
      { to: `/admin/characters/${this.props.characterId}`, label: `Character: ${this.props.backstories.meta.character}` }
      ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Backstories' />
          <h1 className='text-center top-padded'>Backstories for {this.props.backstories.meta.character}</h1>
          <BackstoriesTabs backstories={this.props.backstories.items} />
        </div>
      </div>
    )
  }
}

export default AdminIndexBackstoriesContainer
