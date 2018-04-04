import React, { Component } from 'react'

import List from '../components/character/List'
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

  render() {
    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='bottomless text-center top-padded'>Characters <VersionLabel /></h1>
          <List characters={this.props.characters} deleteCharacter={this.props.deleteCharacter} />
        </div>
      </div>
    )
  }
}

export default IndexCharactersContainer
