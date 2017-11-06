import React, { Component } from 'react'

import List from '../components/character/List'

class IndexCharactersContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.characters.length == 0) {
      this.props.getCharacters()
    }
  }

  render() {
    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Characters</h1>
          <List characters={this.props.characters} />
        </div>
      </div>
    )
  }
}

export default IndexCharactersContainer
