import React, { Component } from 'react'

import authenticateUser from '../../../sharedResources/constants/authenticateUser'
import List from '../components/character/List'
import TalliesTable from '../../../sharedResources/components/tallies/TalliesTable'
import VersionLabel from '../components/VersionLabel'

class IndexCharactersContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.characters.length === 0) {
      this.props.getCharacters()
    }
  }

  componentWillReceiveProps(nextProps) {
    authenticateUser(nextProps.isSignedIn, this.props.push, this.props.flashNotice)
  }

  render() {
    const showUserTallies = (this.props.userTallies && this.props.userTallies.length > 0)

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='bottomless text-center top-padded'>Characters <VersionLabel /></h1>
          <List
            characters={this.props.characters}
            defaultCharacterId={this.props.defaultCharacterId}
            deleteCharacter={this.props.deleteCharacter}
            playerCpAvailable={this.props.playerCpAvailable}
            updateDefaultCharacter={this.props.updateDefaultCharacter}
          />
          {showUserTallies && <div><h2>Recent User Activity</h2><TalliesTable tallies={this.props.userTallies} /></div>}
        </div>
      </div>
    )
  }
}

export default IndexCharactersContainer
