import React, { Component } from 'react'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import { default as PelsList } from '../components/pels/List'

class EventPelsIndexConainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug != this.props.eventPels.slug) {
      this.props.getAdminEventPels(this.props.eventSlug)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  render() {
    const { eventPels, eventSlug, isFetchingPels } = this.props

    if (isFetchingPels) {
      return(
        <div className='text-center top-padded'>
          <i className='fa fa-spinner fa-pulse fa-3x fa-fw' />
        </div>
      )
    }

    const breadcrumbs = [
      { to: '/admin/events', label: 'Events' },
      { to: `/admin/events/${eventSlug}`, label: eventPels.name},
      { to: `/admin/events/${eventSlug}/reports`, label: 'Reports'}
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='PELs' />
          <h1 className='text-center top-padded'>{eventPels.name} PELs</h1>
          <PelsList bookings={eventPels.bookings} eventSlug={eventSlug} />
        </div>
      </div>
    )
  }
}

export default EventPelsIndexConainer
