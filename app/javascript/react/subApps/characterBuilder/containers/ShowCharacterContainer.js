import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BreadcrumbsNav from '../../../sharedResources/components/BreadcrumbsNav'
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
    let {
      available, birthplace, cycleSpendingCap, headers, name, playerAvailable,
      spent, spentCycle
    } = this.props.character

    let breadcrumbs = [{ to: '/characters', label: 'Characters' }]

    let headerElements
    if (headers) {
      headerElements = headers.map(header => {
        return(<div key={header} className='callout'>{header}</div>)
      })
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={name} />
          <h1 className='text-center top-padded'>{name}</h1>
          <div className='row'>
            <div className='small-12 medium-9 columns'>
              <p className='bottomless'>
                <strong>Place of Origin:</strong> {birthplace}
              </p>
              <p className='bottomless'>
                <strong>Player CP Available:</strong> {playerAvailable}
              </p>
              <p className='bottomless'>
                <strong>Character CP Available:</strong> {available}
              </p>
              <p className='bottomless'>
                <strong>CP Spent This Cycle:</strong> {spentCycle} / {cycleSpendingCap}
              </p>
              <p>
                <strong>Total CP Spent:</strong> {spent}
              </p>
            </div>
            <div className='small-12 medium-3 columns'>
              <div className='button-group expanded'>
                <Link className='button' to={`/characters/${this.props.character.id}/edit`}>
                  <i className='fa fa-edit' /> Edit
                </Link>
              </div>
            </div>
          </div>
          {headerElements}
          <TalliesTable tallies={this.props.character.tallies} />
        </div>
      </div>
    )
  }
}

export default ShowCharacterContainer
