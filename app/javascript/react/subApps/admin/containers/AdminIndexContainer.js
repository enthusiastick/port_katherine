import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { restrictToPlotStaff } from '../constants/restrictAccess'

class AdminIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    restrictToPlotStaff(this.props.currentUser, this.props.push, this.props.flashNotice)
  }

  render() {
    let awardCPLink = null;

    if (this.props.currentUser.role === 'admin') {
      awardCPLink =
        <Link className='button' to='/admin/award_character_points'>
          <h2>Award CP</h2>
        </Link>
    }

    return(
      <div className='row'>
        <div className='small-11 medium-9 large-7 small-centered columns'>
          <div className='stacked button-group top-padded'>
            {awardCPLink}
            <Link className='button' to='/admin/characters'>
              <h2>Characters</h2>
            </Link>
            <Link className='button' to='/admin/events'>
              <h2>Events</h2>
            </Link>
            <Link className='button' to='/admin/users'>
              <h2>Users</h2>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default AdminIndexContainer
