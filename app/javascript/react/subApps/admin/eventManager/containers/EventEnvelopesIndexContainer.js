import React, { Component } from 'react'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import EnvelopesTable from '../components/EnvelopesTable'

class EventEnvelopesIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (this.props.eventSlug != this.props.eventEnvelopes.slug) {
      this.props.getAdminEventEnvelopes(this.props.eventSlug)
    }
  }

  render() {
    const { eventEnvelopes, eventSlug } = this.props

    const breadcrumbs = [
      { to: '/admin/events', label: 'Events' },
      { to: `/admin/events/${eventSlug}`, label: eventEnvelopes.name},
      { to: `/admin/events/${eventSlug}/reports`, label: 'Reports'}
    ]

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Envelopes' />
          <h1 className='text-center top-padded'>{eventEnvelopes.name} Envelopes</h1>
          <EnvelopesTable characters={eventEnvelopes.characters} />
          {
            this.props.isFetchingEnvelopes &&
            <div className='text-center'>
              <i className='fa fa-spinner fa-pulse fa-3x fa-fw' />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default EventEnvelopesIndexContainer
