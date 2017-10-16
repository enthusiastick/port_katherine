import React, { Component } from 'react'

import Table from '../components/Table'

import restrictAccess from '../../constants/restrictAccess'

class UsersIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    restrictAccess(this.props.currentUser, this.props.push, this.props.flashNotice)

    if (this.props.adminUsers.length == 0) {
      this.props.getAdminUsers()
    }
  }

  render() {
    return(
      <div className='row'>
        <div className='small-12 columns'>
          <h1 className='text-center top-padded'>Users</h1>
          <Table users={this.props.adminUsers} />
        </div>
      </div>
    )
  }
}

export default UsersIndexContainer
