import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Table from '../components/Table'

import restrictAccess from '../../constants/restrictAccess'

class EventsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    restrictAccess(this.props.currentUser, this.props.push, this.props.flashNotice)

    if (this.props.adminEvents.length == 0) {
      this.props.getAdminEvents()
    }
  }

  render() {
    return(
      <div className='row'>
        <div className='small-12 columns'>
          <div className='text-center'>
            <h1 className='top-padded'>Events</h1>
            <Link to='/admin/events/new' className='button large'><i className='fa fa-plus' /> Add New Event</Link>
          </div>
          <Table deleteAdminEvent={this.props.deleteAdminEvent} events={this.props.adminEvents} />
        </div>
      </div>
    )
  }
}

export default EventsIndexContainer
