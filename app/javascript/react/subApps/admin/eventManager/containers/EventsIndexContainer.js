import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { default as EventsTable } from '../components/Table'

import { authorizeUserRole } from '../../constants/restrictAccess'

class EventsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.adminEvents.length == 0) {
      this.props.getAdminEvents()
    }
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isPlotStaff, this.props.push, this.props.flashNotice)
  }

  render() {
    return(
      <div className='row'>
        <div className='small-12 columns'>
          <div className='text-center'>
            <h1 className='top-padded'>Events</h1>
            {this.props.isCurrentUserAdmin && <Link to='/admin/events/new' className='button large'><i className='fa fa-plus' /> Add New Event</Link>}
          </div>
          <EventsTable
            deleteAdminEvent={this.props.deleteAdminEvent}
            events={this.props.adminEvents}
            isCurrentUserAdmin={this.props.isCurrentUserAdmin}
          />
        </div>
      </div>
    )
  }
}

export default EventsIndexContainer
