import React, { Component } from 'react'

import { authorizeUserRole } from '../../constants/restrictAccess'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import {default as CheckInList} from '../components/checkIn/List'
import { default as CheckInProgress } from '../components/checkIn/Progress'
import { default as CompletedList } from '../components/checkIn/Completed'

class AdminEventCheckInContainer extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  componentWillMount() {
    if (this.props.eventSlug != this.props.event.slug) {
      this.props.getAdminEvents()
    }
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isPlotStaff, this.props.push, this.props.flashNotice)
  }

  handleDeleteClick(bookingId) {
    const values = { bookingId: bookingId, id: this.props.eventSlug }
    this.props.deleteCheckIn(values)
  }

  render() {
    const { createCheckIn, deleteCheckIn, event, eventSlug, isFetching } = this.props

    const breadcrumbs = [
      { to: '/admin/events', label: 'Events' },
      { to: `/admin/events/${eventSlug}`, label: event.name}
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Check-In' />
          <h1 className='text-center top-padded'>{event.name} Check-In</h1>
          <CheckInProgress bookings={event.bookings} isFetching={isFetching} />
          <CheckInList bookings={event.bookings} characters={event.charactersByUserHandle} createCheckIn={createCheckIn} />
          {
            isFetching &&
            <div className='text-center'>
              <i className='fa fa-spinner fa-pulse fa-3x fa-fw' />
            </div>
          }
          <CompletedList
            bookings={event.bookings}
            deleteCheckIn={deleteCheckIn}
            handleDeleteClick={this.handleDeleteClick}
          />
        </div>
      </div>
    )
  }
}

export default AdminEventCheckInContainer
