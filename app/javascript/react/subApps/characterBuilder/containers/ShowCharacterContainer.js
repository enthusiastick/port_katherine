import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BreadcrumbsNav from '../../../sharedResources/components/BreadcrumbsNav'
import { default as CharacterBasics } from '../components/character/Basics'
import { default as HeaderSummary } from '../components/header/Summary'
import TalliesTable from '../components/tallies/TalliesTable'

class ShowCharacterContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.characterId != this.props.character.id) {
      this.props.getCharacter(this.props.characterId)
    }
  }

  render() {
    let { headers, name, open } = this.props.character

    let breadcrumbs = [{ to: '/characters', label: 'Characters' }]

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
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={name} />
          <h1 className='text-center top-padded'>{name}</h1>
          <div className='row'>
            <div className='small-12 medium-9 columns'>
              <CharacterBasics {...this.props.character} />
            </div>
            <div className='small-12 medium-3 columns'>
              <div className='button-group expanded'>
                <Link className='button' to={`/characters/${this.props.character.id}/edit`}>
                  <i className='fa fa-edit' /> Edit
                </Link>
              </div>
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

export default ShowCharacterContainer
