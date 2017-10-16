import React, { Component } from 'react'

import restrictAccess from '../../constants/restrictAccess'

import BookingsTable from '../components/BookingsTable'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'

class EventShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    restrictAccess(this.props.currentUser, this.props.push, this.props.flashNotice)

    if (this.props.eventSlug && !this.props.event) {
      this.props.getAdminEvents()
    }
  }

  render() {
    let breadcrumbs = [{ to: '/admin/events', label: 'Events' }]
    let bookings, label

    if (this.props.eventSlug && this.props.event) {
      bookings = <BookingsTable bookings={this.props.event.bookings} />
      label = `${this.props.event.name} Registrations`
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={label} />
          <h1 className='text-center top-padded'>{label}</h1>
          {bookings}
        </div>
      </div>
    )
  }
}

export default EventShowContainer
