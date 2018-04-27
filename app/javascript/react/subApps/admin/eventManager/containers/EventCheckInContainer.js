import React, { Component } from 'react'

import { authorizeUserRole } from '../../constants/restrictAccess'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import CheckInList from '../components/CheckInList'

class AdminEventCheckInContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug != this.props.event.slug) {
      this.props.getAdminEvents()
    }
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isPlotStaff, this.props.push, this.props.flashNotice)
  }

  render() {
    const { createCheckIn, event, eventSlug } = this.props

    const breadcrumbs = [
      { to: '/admin/events', label: 'Events' },
      { to: `/admin/events/${eventSlug}`, label: event.name}
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Check-In' />
          <h1 className='text-center top-padded'>{event.name} Check-In</h1>
          <CheckInList bookings={event.bookings} characters={event.charactersByUserHandle} createCheckIn={createCheckIn} />
          {
            this.props.isFetching &&
            <div className='text-center'>
              <i className='fa fa-spinner fa-pulse fa-3x fa-fw' />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default AdminEventCheckInContainer
