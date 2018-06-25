import React, { Component } from 'react'

import BreadcrumbsNav from '../../../../sharedResources/components/BreadcrumbsNav'
import LoadingSpinner from '../../../../sharedResources/components/LoadingSpinner'
import HeadersTable from '../components/HeadersTable'

class EventHeadersIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.eventHeaders.characters.length === 0) {
      this.props.getAdminEventHeaders(this.props.eventSlug)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.authenticateSignedInPlotStaff(nextProps.isPlotStaff)
  }

  render() {
    const { eventHeaders, eventSlug, isFetchingHeaders } = this.props
    const { characters, meta } = eventHeaders

    if (isFetchingHeaders) { return <LoadingSpinner /> }

    let breadcrumbs = [{ to: '/admin/events', label: 'Events' }]

    if (meta) {
      breadcrumbs.push({ to: `/admin/events/${eventSlug}`, label: meta.eventName})
      breadcrumbs.push({ to: `/admin/events/${eventSlug}/reports`, label: 'Reports'})
    }

    return(
      <div className='row'>
        <div className='small-12 columns'>
          <BreadcrumbsNav breadcrumbs={breadcrumbs} current='Headers' />
          <h1 className='text-center top-padded'>{meta && `${meta.eventName} ${meta.headerName}s`}</h1>
          <HeadersTable characters={characters} meta={meta} />
        </div>
      </div>
    )
  }
}

export default EventHeadersIndexContainer
