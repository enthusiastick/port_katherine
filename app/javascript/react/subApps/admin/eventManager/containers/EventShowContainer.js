import React, { Component } from 'react'

import { authorizeUserRole } from '../../constants/restrictAccess'

import BookingsTable from '../components/BookingsTable'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'

class EventShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug && !this.props.event) {
      this.props.getAdminEvents()
    }
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isPlotStaff, this.props.push, this.props.flashNotice)
  }

  render() {
    let breadcrumbs = [{ to: '/admin/events', label: 'Events' }]
    let categories, label, bookingsTables

    if (this.props.eventSlug && this.props.event) {
      label = `${this.props.event.name} Registrations`
      categories = Object.keys(this.props.event.bookings)
      bookingsTables = categories.map(category => {
        return(
          <BookingsTable
            key={category}
            category={category}
            bookings={this.props.event.bookings[category]}
          />
        )
      })
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={label} />
          <h1 className='text-center top-padded'>{label}</h1>
          {bookingsTables}
        </div>
      </div>
    )
  }
}

export default EventShowContainer
