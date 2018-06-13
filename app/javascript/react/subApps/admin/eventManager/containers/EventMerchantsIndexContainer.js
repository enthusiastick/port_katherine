import React, { Component } from 'react'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'
import MerchantsTable from '../components/MerchantsTable'

class EventMerchantsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.eventMerchants.characters.length === 0) {
      this.props.getAdminEventMerchants(this.props.eventSlug)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  render() {
    const { eventMerchants, eventSlug, isFetchingMerchants } = this.props
    const { characters, meta } = eventMerchants

    if (isFetchingMerchants) { return <LoadingSpinner /> }

    let breadcrumbs = [{ to: '/admin/events', label: 'Events' }]

    if (meta) {
      breadcrumbs.push({ to: `/admin/events/${eventSlug}`, label: meta.eventName})
      breadcrumbs.push({ to: `/admin/events/${eventSlug}/reports`, label: 'Reports'})
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Merchants' />
          <h1 className='text-center top-padded'>{meta && meta.eventName} Merchants</h1>
          <MerchantsTable characters={characters} />
        </div>
      </div>
    )
  }
}

export default EventMerchantsIndexContainer
