import React, { Component } from 'react'

import { restrictToPlotStaff } from '../../constants/restrictAccess'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import { default as CharacterBasics } from '../../../characterBuilder/components/character/Basics'
import { default as HeaderSummary } from '../../../characterBuilder/components/header/Summary'
import TalliesTable from '../../../characterBuilder/components/tallies/TalliesTable'

class AdminShowCharacterContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    restrictToPlotStaff(this.props.currentUser, this.props.push, this.props.flashNotice)

    if (this.props.characterId != this.props.character.id) {
      this.props.getCharacter(this.props.characterId)
    }
  }

  render() {
    let { headers, name, open, userHandle } = this.props.character

    let breadcrumbs = [{ to: '/admin/users', label: 'Users' }, { to: `/admin/users/${userHandle}`, label: userHandle }]

    let headerElements
    if (headers) {
      headerElements = headers.map(header => {
        return(<HeaderSummary key={header.headerId} {...header} />)
      })
    }

    let openElements
    if (open) {
      openElements = (<HeaderSummary name='Open' skills={open} />)
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={`Character: ${name}`} />
          <h1 className='text-center top-padded'>
            <span className='fa-stack fa-lg'>
              <i className='fa fa-circle-o fa-stack-2x' />
              <i className='fa fa-anchor fa-stack-1x' />
            </span>
            &nbsp;{name}
          </h1>
          <div className='row'>
            <div className='small-12 columns'>
              <CharacterBasics {...this.props.character} />
            </div>
          </div>
          {openElements}
          {headerElements}
          <TalliesTable tallies={this.props.character.tallies} />
        </div>
      </div>
    )
  }
}

export default AdminShowCharacterContainer
