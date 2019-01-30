import React, { Component } from 'react'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import {default as HeadersList} from '../components/locks/header/List'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class AdminCharacterLocksContainer extends Component {
  constructor(props) {
    super(props)
    this.toggleLock = this.toggleLock.bind(this)
  }

  toggleLock(characterSkillId) {
    console.log(characterSkillId)
  }

  componentDidMount() {
    if (this.props.characterId !== this.props.character.id) {
      this.props.editCharacter(this.props.characterId)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  render() {
    if (this.props.isFetching) {
      return <LoadingSpinner />
    }

    const { character } = this.props
    const { headers, id, name, userHandle } = character

    const breadcrumbs = [
      { to: '/admin/users', label: 'Users' },
      { to: `/admin/users/${userHandle}`, label: userHandle },
      { to: `/admin/characters/${id}`, label: `Character: ${name}` }
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Lock & Unlock' />
          <h1 className='text-center top-padded'>
            <i className='fa fa-unlock' />
            &nbsp;Lock & Unlock Skills for {name}
          </h1>
          <HeadersList headers={headers} toggleLock={this.toggleLock} />
        </div>
      </div>
    )
  }
}

export default AdminCharacterLocksContainer
