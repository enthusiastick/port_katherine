import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { default as EventsTable } from '../components/Table'

import { authorizeUserRole } from '../../constants/restrictAccess'

class EventsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.adminEvents.past.length == 0) {
      this.props.getAdminEventsV2()
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
          {this.props.adminEvents.upcoming.length !== 0 &&
          <div>
            <h3>Upcoming Events</h3>
            <EventsTable
              deleteAdminEvent={this.props.deleteAdminEvent}
              events={this.props.adminEvents.upcoming}
              isCurrentUserAdmin={this.props.isCurrentUserAdmin}
            />
          </div>}
          {this.props.adminEvents.past.length !== 0 &&
          <div>
            <h3>Past Events</h3>
            <EventsTable
              deleteAdminEvent={this.props.deleteAdminEvent}
              events={this.props.adminEvents.past}
              isCurrentUserAdmin={this.props.isCurrentUserAdmin}
            />
          </div>}
        </div>
      </div>
    )
  }
}

export default EventsIndexContainer
