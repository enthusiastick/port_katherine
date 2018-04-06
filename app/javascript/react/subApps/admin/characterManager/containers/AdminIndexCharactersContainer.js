import React, { Component } from 'react'

import { authorizeUserRole } from '../../constants/restrictAccess'
import CharactersTable from '../components/CharactersTable'

class AdminIndexCharactersContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.characters.length === 0) {
      this.props.getAdminCharacters()
    }
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isPlotStaff, this.props.push, this.props.flashNotice)
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
