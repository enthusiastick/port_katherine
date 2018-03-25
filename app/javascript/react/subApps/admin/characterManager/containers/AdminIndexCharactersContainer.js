import React, { Component } from 'react'

import { restrictToPlotStaff } from '../../constants/restrictAccess'
import CharactersTable from '../components/CharactersTable'

class AdminIndexCharactersContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    restrictToPlotStaff(this.props.currentUser, this.props.push, this.props.flashNotice)

    if (this.props.characters.length === 0) {
      this.props.getAdminCharacters()
    }
  }

  render() {
    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Characters</h1>
          <CharactersTable characters={this.props.characters} />
        </div>
      </div>
    )
  }
}

export default AdminIndexCharactersContainer
