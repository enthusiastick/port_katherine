import React, { Component } from 'react'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class AdminCharacterNewSkillContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.meta.characterId !== this.props.characterId) {
      this.props.getAdminAvailableSkills(this.props.characterId)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  render() {
    if (this.props.isFetching) {
      return <LoadingSpinner />
    }

    const { skills, meta } = this.props
    const { characterId, characterName, userId } = meta

    const breadcrumbs = [
      { to: '/admin/users', label: 'Users' },
      { to: `/admin/users/${userId}`, label: userId},
      { to: `/admin/characters/${characterId}`, label: `Character: ${characterName}` }
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Reveal Skills' />
          <h1 className='text-center top-padded'>
            <i className='fa fa-eye-slash' />
            &nbsp;Reveal Skills for {characterName}
          </h1>
        </div>
      </div>
    )
  }
}

export default AdminCharacterNewSkillContainer
