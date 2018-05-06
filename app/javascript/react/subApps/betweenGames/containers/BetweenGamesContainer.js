import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { default as PelsList } from '../components/pels/List'

class BetweenGamesContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.bookings.length === 0) {
      this.props.getBetweenGames()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInUser(nextProps.isSignedIn)
  }

  render() {
    const { bookings } = this.props

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Between Events</h1>
          <h3>Between-Games Skills</h3>
          <p>Coming Soon!</p>
          <h3>Post-Event Letters</h3>
          <Link className='button' to='/pels/new'>
            <i className='fa fa-plus' /> Submit a PEL
          </Link>
          <PelsList bookings={bookings} />
        </div>
      </div>
    )
  }
}

export default BetweenGamesContainer
