import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { authorizeUserRole } from '../../constants/restrictAccess'

import BookingsTable from '../components/BookingsTable'
import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'

class EventShowContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug != this.props.event.slug) {
      this.props.getAdminEvent(this.props.eventSlug)
    }
  }

  componentWillReceiveProps(nextProps) {
    authorizeUserRole(nextProps.isPlotStaff, this.props.push, this.props.flashNotice)
  }

  render() {
    if (this.props.isFetching) { return <LoadingSpinner /> }
    const breadcrumbs = [{ to: '/admin/events', label: 'Events' }]
    let categories, label, bookingsTables

    if (this.props.event.slug) {
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
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current={this.props.event.name} />
          <div className='text-center'>
            <h1 className='top-padded'>{this.props.event.name}</h1>
            <div className='row'>
              <div className='small-11 medium-8 large-5 small-centered columns'>
                <div className='button-group expanded'>
                  {this.props.event.showCheckIn && <Link className='button' to={`/admin/events/${this.props.eventSlug}/check-in`}>
                    <i className='fa fa-clock-o' /> Check In
                  </Link>}
                  <Link className='button' to={`/admin/events/${this.props.eventSlug}/reports`}>
                    <i className='fa fa-folder-open' /> Reports
                  </Link>
                </div>
              </div>
            </div>
            <h2>Registrations</h2>
          </div>
          {bookingsTables}
        </div>
      </div>
    )
  }
}

export default EventShowContainer
