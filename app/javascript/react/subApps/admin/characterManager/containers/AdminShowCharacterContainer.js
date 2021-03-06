import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { authorizeUserRole } from '../../constants/restrictAccess'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import { default as CharacterBasics } from '../../../characterBuilder/components/character/Basics'
import { default as HeaderSummary } from '../../../characterBuilder/components/header/Summary'
import TalliesTable from '../../../../sharedResources/components/tallies/TalliesTable'

class AdminShowCharacterContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.characterId != this.props.character.id) {
      this.props.getCharacter(this.props.characterId)
    }
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isPlotStaff, this.props.push, this.props.flashNotice)
  }

  render() {
    let { headers, id, name, open, userHandle } = this.props.character

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
            <div className='small-12 medium-8 columns'>
              <CharacterBasics {...this.props.character} />
            </div>
            <div className='small-12 medium-3 columns'>
              <div className='button-group stacked'>
                <Link className='button' to={`/admin/characters/${this.props.character.id}/headers/new`}>
                  <i className='fa fa-plus-circle' /> Add Headers
                </Link>
                {this.props.character.backstoriesCount > 0 && <Link className='button' to={`/admin/characters/${this.props.character.id}/backstories`}>
                  <i className='fa fa-book' /> Backstory
                </Link>}
                <a
                  className='button'
                  href={`/admin/characters/${this.props.character.id}/sheets`}
                  target='_blank'
                >
                  <i className='fa fa-print' /> Character Sheet
                </a>
                <Link className='button' to={`/admin/characters/${this.props.character.id}/locks`}>
                  <i className='fa fa-unlock' /> Lock & Unlock Skills
                </Link>
                <Link className='button' to={`/admin/characters/${this.props.character.id}/skills/new`}>
                  <i className='fa fa-eye-slash' /> Reveal Skills
                </Link>
                <Link className='button' to={`/admin/characters/${this.props.character.id}/edit`}>
                  <i className='fa fa-edit' /> Spend CP
                </Link>
              </div>
            </div>
          </div>
          {openElements}
          {headerElements}
          <h2>Recent Activity <Link to={`/admin/characters/${id}/build_logs`}><i className='fa fa-search' /></Link></h2>
          <TalliesTable tallies={this.props.character.tallies} />
        </div>
      </div>
    )
  }
}

export default AdminShowCharacterContainer
